'use client';

import { useMemo, useState } from 'react';

type LoginProps = {
  onSuccess: () => void;
};

export default function Login({ onSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return username.trim().length > 0 && password.trim().length > 0;
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Hardcoded credentials as requested
    const OK_USER = 'user-pm';
    const OK_PASS = '12345';

    if (username.trim() === OK_USER && password === OK_PASS) {
      onSuccess();
      return;
    }

    setError('Invalid credentials');
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
  {/* ✅ smaller card (md -> sm) */}
  <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* ✅ smaller padding */}
    <div className="p-6 border-b border-slate-100 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Service Management
      </h1>
      <p className="text-slate-500 mt-1">Sign in to access the dashboard</p>
    </div>

    {/* ✅ smaller padding */}
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">User Name</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-200"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Password</label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPwd ? 'text' : 'password'}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-200"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            {/* {showPwd ? 'Hide' : 'Show'} */}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition-all active:scale-[0.99] ${
          canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'
        }`}
      >
        Login
      </button>
    </form>
  </div>
</div>


  );
}
