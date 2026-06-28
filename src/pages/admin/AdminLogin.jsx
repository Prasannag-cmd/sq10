/* ============================================================
   ADMIN LOGIN PAGE — Supabase Email/Password Authentication
   ============================================================ */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <img src="/assets/images/logo.png" alt="Squaareten" className="admin-login__logo" />
          <h1 className="admin-login__title">Admin Panel</h1>
          <p className="admin-login__subtitle">Squaareten Construction Pvt Ltd</p>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && (
            <div className="admin-login__error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          <div className="admin-login__field">
            <label className="admin-login__label">Email Address</label>
            <input
              type="email"
              className="admin-login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@squaareten.com"
              required
              autoFocus
            />
          </div>

          <div className="admin-login__field">
            <label className="admin-login__label">Password</label>
            <input
              type="password"
              className="admin-login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login__btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="admin-loading__spinner admin-loading__spinner--sm" />
                Signing in...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Sign In
              </>
            )}
          </button>
        </form>

        <a href="/" className="admin-login__back">← Back to Website</a>
      </div>
    </div>
  );
}
