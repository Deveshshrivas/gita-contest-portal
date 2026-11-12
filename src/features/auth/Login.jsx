import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Login() {
  const { loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginWithCredentials(email.trim(), password);

      if (res.success && res.user) {
        if (res.user.role === 'student') {
          navigate('/student/dashboard');
        } else if (res.user.role === 'donor') {
          navigate('/donor/dashboard');
        } else {
          navigate('/admin');
        }
      } else {
        setError(res.error || 'Invalid email or password. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login request failed. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillSuperAdmin = () => {
    setEmail('admin@gitacontest.in');
    setPassword('Admin@Gita2026');
    setError('');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-14 h-14 rounded-2xl bg-vedic-primary text-white flex items-center justify-center text-3xl shadow-lg font-bold font-shloka">
              🕉️
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gita Examination Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in with your Super Administrator or candidate credentials to manage and conduct examinations.
          </p>
        </div>

        {/* Super Admin Quick Autofill Helper Box */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Shield size={14} className="text-amber-600" />
              <span>Super Administrator Access</span>
            </div>
            <p className="text-[11px] text-amber-700 font-mono">admin@gitacontest.in</p>
          </div>
          <button
            type="button"
            onClick={handleFillSuperAdmin}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Sparkles size={13} />
            <span>Fill Credentials</span>
          </button>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
              <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Authentication Failed</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Mail size={13} className="text-slate-400" />
                <span>Email Address / ID</span>
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gitacontest.in"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:border-vedic-teal focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock size={13} className="text-slate-400" />
                  <span>Password</span>
                </label>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:border-vedic-teal focus:outline-none transition"
              />
            </div>

            <Button
              type="submit"
              size="md"
              disabled={loading}
              className="w-full font-bold py-2.5 mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight size={15} />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/" className="hover:text-vedic-primary font-medium transition">
              ← Return to Public Website
            </Link>
            <Link to="/register" className="text-vedic-primary font-bold hover:underline">
              Register Candidate
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
