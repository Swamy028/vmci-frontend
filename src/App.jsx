import { useEffect, useState } from 'react';
import './App.css';
import { api } from './lib/api';
import Login from './components/Login';
import ProgressRail from './components/ProgressRail';
import JobHeader from './components/JobHeader';
import ChecklistStage from './components/ChecklistStage';
import ReadyStage from './components/ReadyStage';
import OperationStage from './components/OperationStage';

const CHECKLIST_STAGES = new Set(['MACHINE_CHECKS', 'TOOLS', 'WORKPIECE']);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (loggedIn) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(()=>{
    const login = localStorage.getItem('loggedIn');
    if (login === 'true') {
      setLoggedIn(true);
    }
  },[])

  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getState();
      setState(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (action) => {
    setError('');
    try {
      const data = await action();
      setState(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleConfirm = async (itemId) => {
    setBusyId(itemId);
    setError('');
    try {
      const data = await api.confirmItem(itemId);
      setState(data);
    } catch (err) {
      setError(err.message || 'Failed to confirm item');
    } finally {
      setBusyId(null);
    }
  };

  const handleNext = async () => {
    await runAction(api.next);
  };

  const handleReset = async () => {
    await runAction(api.reset);
  };

  const handlePrevious = async () => {
    await runAction(api.previous);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setState(null);
    setShowLogoutModal(false);
  };

  if (!loggedIn) {
    return <Login onLoggedIn={() => setLoggedIn(true)} />;
  }

  if (loading && !state) {
    return <div className="center-message">Loading machine state...</div>;
  }

  if (!state) {
    return (
      <div className="center-message">
        { 'No connection to the backend yet.'}
      </div>
    );
  }

  console.log('Current state:', state);

  return (
    <div className="hmi">
      <div className="hmi-header">
        <ProgressRail currentStage={state.currentStage} />
        <button
          className="logout-btn"
          onClick={() => setShowLogoutModal(true)}
          title="Logout"
        >
          ⊗
        </button>
      </div>

      <JobHeader jobInfo={state.jobInfo} />

      {error && <div className="error-banner">{error}</div>}

      {CHECKLIST_STAGES.has(state.currentStage) && (
        <ChecklistStage
          stage={state.currentStage}
          items={state.currentStageItems}
          canAdvance={state.canAdvance}
          busyId={busyId}
          onConfirm={handleConfirm}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      {state.currentStage === 'READY' && (
        <ReadyStage jobInfo={state.jobInfo} onProceed={() => runAction(api.next)} />
      )}

      {state.currentStage === 'OPERATION' && (
        <OperationStage
          jobInfo={state.jobInfo}
          status={state.operationStatus}
          onStart={() => runAction(api.start)}
          onStop={() => runAction(api.stop)}
          onReset={handleReset}
        />
      )}

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className="btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
