import { useState, type FormEvent } from 'react';
import { KeyRound, Loader2, LockKeyhole, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import { validateAdminPassword, updateAdminPassword } from '@/lib/feedback';
import { useLanguage } from '@/i18n/useLanguage';

interface AdminLoginProps {
  onAuthenticated: (password: string) => void;
}

export function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const { copy } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // States for Login
  const [password, setPassword] = useState('');
  
  // States for New Password Setup
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Handle Login
  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || submitting) return;

    setSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      if (validateAdminPassword(password)) {
        onAuthenticated(password);
      } else {
        setErrorMessage(copy?.admin?.invalidPassword || 'Incorrect password entered.');
        setSubmitting(false);
      }
    }, 400);
  };

  // Handle Doctor Custom Password Creation
  const handleSignUpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      return;
    }

    updateAdminPassword(newPassword);
    setSuccessMessage('New Password set successfully! You can now sign in.');
    setPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setMode('login');
  };

  return (
    <div className="flex flex-col gap-6 px-6 pb-10 pt-8 sm:px-8">
      {/* Mode Switcher Tabs */}
      <div className="flex justify-center border-b border-navy-100 pb-4">
        <div className="flex rounded-full bg-navy-50 p-1">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition ${
              mode === 'login' ? 'bg-navy-800 text-white shadow-card' : 'text-navy-700 hover:text-navy-900'
            }`}
          >
            <LogIn className="h-3.5 w-3.5" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition ${
              mode === 'signup' ? 'bg-teal-600 text-white shadow-card' : 'text-navy-700 hover:text-navy-900'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" /> Set Custom Password
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-800">
          <LockKeyhole className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-xl font-semibold text-navy-800">
          {mode === 'login' ? (copy?.admin?.loginTitle || 'Admin Sign In') : 'Doctor Password Setup'}
        </h3>
        <p className="text-xs text-ink-600">
          {mode === 'login'
            ? (copy?.admin?.loginSubtitle || 'Enter password to access feedback leads.')
            : 'Create your custom password for secure hospital access.'}
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-2xl bg-success-50 px-4 py-3 text-xs font-medium text-success-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <p role="alert" className="rounded-2xl bg-error-50 px-4 py-3 text-xs font-medium text-error-700 text-center">
          {errorMessage}
        </p>
      )}

      {/* LOGIN FORM */}
      {mode === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-navy-800">
            {copy?.admin?.passwordLabel || 'Admin Password'}
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy?.admin?.passwordPlaceholder || 'Enter password'}
                autoComplete="current-password"
                autoFocus
                className="w-full rounded-2xl border border-navy-100 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!password || submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? (copy?.admin?.signingIn || 'Signing In...') : (copy?.admin?.signIn || 'Sign In')}
          </button>
        </form>
      ) : (
        /* DOCTOR PASSWORD CREATION FORM */
        <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-navy-800">
            New Doctor Password
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new custom password"
                className="w-full rounded-2xl border border-navy-100 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-navy-800">
            Confirm New Password
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full rounded-2xl border border-navy-100 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!newPassword || !confirmPassword}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            Save Password & Activate
          </button>
        </form>
      )}
    </div>
  );
}