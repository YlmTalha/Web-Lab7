import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { login } from '../api/authApi.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // page the user originally tried to open, or "/" if they came here directly
  const from = location.state?.from;
  const redirectTo = from ? from.pathname + from.search : '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(username, password);
      logIn(user);
      navigate(redirectTo, { replace: true }); // do not keep /login in history
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}
