import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">Admin Access</p>
        <h1 className="text-2xl font-semibold text-text-primary mb-8" style={{ letterSpacing: '-0.02em' }}>
          Pintu Kumar <span className="text-text-muted font-light">/ CMS</span>
        </h1>

        {error && (
          <div className="border border-red-500/30 bg-red-500/5 text-red-400 px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              className="w-full bg-surface-2 border border-border text-text-primary px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              className="w-full bg-surface-2 border border-border text-text-primary px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-yellow-300 disabled:opacity-50 text-surface py-2.5 text-sm font-semibold transition-colors mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
