import { api } from "../lib/api";

export default function OperationStage({ jobInfo, status, onStart, onStop,onReset }) {
  return (
    <div className="stage">
      <h2 className="stage-heading">Operation</h2>
      <p className="stage-subtext">{jobInfo.operation}</p>

      <div className="op-panel">
        <div className={`op-status ${status}`}>{status}</div>
        <div className="op-name">{jobInfo.partName} &middot; {jobInfo.cncProgram}</div>

        <div className="op-actions">
          {status === 'RUNNING' ? (
            <button className="btn-primary btn-danger" onClick={onStop}>
              Stop
            </button>
          ) : (
            <button className="btn-primary" onClick={onStart} disabled={status !== 'READY'}>
              Start
            </button>
          )}
          <button className="btn-primary" onClick={onReset} disabled={status === 'READY'}>
              Reset
            </button>
        </div>
      </div>
    </div>
  );
}
