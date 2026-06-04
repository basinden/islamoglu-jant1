// src/app/admin/giris/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Geçersiz e-posta veya şifre');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="#1a1a1a" stroke="#c80d0d" strokeWidth="2"/>
                <circle cx="20" cy="20" r="10" fill="none" stroke="#c80d0d" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="4" fill="#c80d0d"/>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return <line key={i} x1={20 + 4 * Math.cos(rad)} y1={20 + 4 * Math.sin(rad)} x2={20 + 10 * Math.cos(rad)} y2={20 + 10 * Math.sin(rad)} stroke="#c80d0d" strokeWidth="1.5"/>;
                })}
              </svg>
            </div>
            <div>
              <div className="font-display text-3xl tracking-widest text-white">İSLAMOĞLU</div>
              <div className="text-xs tracking-[0.3em] text-primary-500 font-semibold">JANT</div>
            </div>
          </div>
          <h1 className="text-dark-400 text-sm">Yönetici Paneli Girişi</h1>
        </div>

        <div className="card p-8">
          {error && (
            <div className="flex items-center gap-3 bg-primary-950 border border-primary-800 rounded-lg px-4 py-3 mb-6 text-primary-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">E-posta Adresi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@islamoglujant.com"
                className="input"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-12"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} /> Giriş Yap
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-dark-600 text-xs mt-6">
          © {new Date().getFullYear()} İslamoğlu Jant
        </p>
      </div>
    </div>
  );
}
