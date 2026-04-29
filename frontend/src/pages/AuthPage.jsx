import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, User, Home as HomeIcon, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/common/Input';

export default function AuthPage() {
  const [tab, setTab] = useState('signin');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-background)]">
      {/* Header */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
          <span className="text-white text-sm font-bold">H</span>
        </div>
        <span className="text-base font-bold text-[var(--color-text-primary)]">HarvestDirect</span>
      </div>

      {/* Auth Card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-8">
        <div className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden animate-scale-in">
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-border)]">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors cursor-pointer ${
                tab === 'signin'
                  ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors cursor-pointer ${
                tab === 'signup'
                  ? 'text-[var(--color-text-primary)] border-b-2 border-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6">
            {tab === 'signin' ? (
              <SignInForm onSuccess={() => navigate('/')} setAuth={setAuth} />
            ) : (
              <SignUpForm onSuccess={() => navigate('/')} setAuth={setAuth} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ onSuccess, setAuth }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock auth — replace with real API
    setTimeout(() => {
      setAuth({ id: '1', name: 'Demo User', phone }, 'mock-jwt-token-123');
      setLoading(false);
      onSuccess();
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Welcome back</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Enter your credentials to access your farm dashboard.
        </p>
      </div>

      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 000-0000"
        icon={Phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Password
          </label>
          <button type="button" className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] cursor-pointer">
            Forgot?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-base pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] cursor-pointer"
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Signing in...' : 'Continue'}
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-[var(--color-surface)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="flex items-center justify-center gap-2 py-3 border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-elevated)] transition-colors cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-[var(--color-text-muted)]" />
          Google
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-3 border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-elevated)] transition-colors cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-[var(--color-text-muted)]" />
          Apple
        </button>
      </div>

      <p className="text-[10px] text-center text-[var(--color-text-muted)] mt-4">
        By continuing, you agree to HarvestDirect's{' '}
        <a href="#" className="underline">Terms of Service</a> and{' '}
        <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}

function SignUpForm({ onSuccess, setAuth }) {
  const [form, setForm] = useState({ name: '', address: '', phone: '', gender: '', password: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return;
    setLoading(true);
    setTimeout(() => {
      setAuth({ id: '1', name: form.name, phone: form.phone }, 'mock-jwt-token-123');
      setLoading(false);
      onSuccess();
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Create Account</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Join HarvestDirect. Enter your details to begin.
        </p>
      </div>

      <Input label="Full Name" placeholder="John Doe" icon={User} value={form.name} onChange={update('name')} required />
      <Input label="Address" placeholder="123 Farm Ave, City" icon={HomeIcon} value={form.address} onChange={update('address')} required />
      <Input label="Phone Number" type="tel" placeholder="(555) 000-0000" icon={Phone} value={form.phone} onChange={update('phone')} required />

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1.5 block">Gender</label>
        <select
          value={form.gender}
          onChange={update('gender')}
          className="input-base appearance-none cursor-pointer"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="relative">
        <Input label="Password" type={showPwd ? 'text' : 'password'} placeholder="••••••••" icon={Lock} value={form.password} onChange={update('password')} required />
      </div>
      <Input label="Confirm Password" type={showPwd ? 'text' : 'password'} placeholder="••••••••" icon={Lock} value={form.confirmPassword} onChange={update('confirmPassword')} required />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-surface)] text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer mt-2"
      >
        {loading ? 'Creating...' : 'Sign Up'}
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[10px] text-center text-[var(--color-text-muted)]">
        By continuing, you agree to HarvestDirect's{' '}
        <a href="#" className="underline">Terms of Service</a> and{' '}
        <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
