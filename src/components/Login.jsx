import { useState } from 'react';
import { api } from '../lib/api';
import { Icon } from '@iconify/react';


export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showpassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Enter both the operator ID and PIN');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await api.login(username.trim(), password);
      localStorage.setItem('loggedIn', 'true');
      onLoggedIn();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>VMC operator sign-in</h1>
        <p>Sign in to start the pre-run checklist</p>

        <div className="login-field">
          <label htmlFor="username">Operator ID</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">PIN</label>
          <input
            id="password"
            type={showpassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            
          />
          <div className="password">
            {!showpassword?<Icon icon="basil:eye-closed-outline" onClick={()=>setShowPassword(true)}/> 
          :<Icon icon="basil:eye-outline" onClick={()=>setShowPassword(false)}/>}
          </div>
          
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>

      </form>
    </div>
  );
}
