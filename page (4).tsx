// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Phone } from 'lucide-react';
import { JANT_INCLERI } from '@/lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/urunler?arama=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-950/95 backdrop-blur-md border-b border-dark-800">
      {/* Top bar */}
      <div className="bg-primary-700 py-1.5 px-4 text-center text-sm text-white font-medium">
        <span className="flex items-center justify-center gap-2">
          <Phone size={14} />
          Bilgi için arayın: <a href="tel:+905551234567" className="font-bold hover:underline">+90 555 123 45 67</a>
          <span className="hidden sm:inline ml-2">• WhatsApp ile de ulaşabilirsiniz</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <circle cx="20" cy="20" r="18" fill="#1a1a1a" stroke="#c80d0d" strokeWidth="2"/>
                <circle cx="20" cy="20" r="10" fill="none" stroke="#c80d0d" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="4" fill="#c80d0d"/>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 20 + 4 * Math.cos(rad);
                  const y1 = 20 + 4 * Math.sin(rad);
                  const x2 = 20 + 10 * Math.cos(rad);
                  const y2 = 20 + 10 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c80d0d" strokeWidth="1.5"/>;
                })}
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-widest text-white group-hover:text-primary-400 transition-colors">
                İSLAMOĞLU
              </span>
              <span className="text-xs tracking-[0.3em] text-primary-500 font-semibold uppercase">
                JANT
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="nav-link px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all text-sm font-medium">
              Ana Sayfa
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all text-sm font-medium flex items-center gap-1">
                Kategoriler
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-dark-900 border border-dark-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 grid grid-cols-2 gap-1">
                  {JANT_INCLERI.map((inci) => (
                    <Link
                      key={inci}
                      href={`/kategori/${inci}`}
                      className="px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg text-sm transition-colors"
                    >
                      {inci}&quot;
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/urunler" className="px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all text-sm font-medium">
              Tüm Ürünler
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-slide-up">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jant ara... (marka, model, bijon)"
                className="input flex-1"
                autoFocus
              />
              <button type="submit" className="btn-primary px-5 py-3">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-dark-900 border-t border-dark-800 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" className="block px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all" onClick={() => setMenuOpen(false)}>
              Ana Sayfa
            </Link>
            <Link href="/urunler" className="block px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-all" onClick={() => setMenuOpen(false)}>
              Tüm Ürünler
            </Link>
            <div className="pt-2">
              <p className="px-4 text-xs text-dark-500 uppercase tracking-wider mb-2">Kategoriler</p>
              <div className="grid grid-cols-4 gap-1">
                {JANT_INCLERI.map((inci) => (
                  <Link
                    key={inci}
                    href={`/kategori/${inci}`}
                    className="text-center py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg text-sm transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {inci}&quot;
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
