const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore parse failure, keep default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (username, password) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getState: () => request('/api/session'),
  confirmItem: (itemId) => request(`/api/session/items/${itemId}/confirm`, { method: 'POST' }),
  next: () => request('/api/session/next', { method: 'POST' }),
  start: () => request('/api/session/start', { method: 'POST' }),
  stop: () => request('/api/session/stop', { method: 'POST' }),
  reset: () => request('/api/session/reset', { method: 'POST' }),
  previous: () => request('/api/session/previous', { method: 'POST' }),

};
