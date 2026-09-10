import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo admin credentials for CMS preview (can be connected to backend auth)
    if (username === 'admin' && password === 'devibai2026') {
      sessionStorage.setItem('devibai_admin_token', 'session_auth_token_active');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid staff credentials. Default preview is username: admin, password: devibai2026');
    }
  };

  return (
    <div className="min-h-[70vh] py-16 bg-slate-100 flex items-center justify-center">
      <SEOHead title="Staff Login | Devibai Hospital Portal" />
      <div className="max-w-md w-full mx-4">
        <div className="medical-card p-8 border border-slate-200 shadow-xl bg-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 text-teal-400 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-navy-900">
              Hospital Staff Portal
            </h1>
            <p className="text-xs text-slate-500">
              Devibai Super Speciality Hospital CMS & Administrative Desk
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-emergency-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Staff Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
              <strong>Preview access:</strong> User: <code className="bg-slate-200 px-1 rounded">admin</code> | Pass: <code className="bg-slate-200 px-1 rounded">devibai2026</code>
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-sm py-3 justify-center font-bold"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs text-slate-500 hover:text-navy-900"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Hospital Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
