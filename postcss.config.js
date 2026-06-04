// src/app/admin/layout.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Package, PlusCircle, LogOut, Menu, ChevronRight, Settings
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/urunler', label: 'Ürünler', icon: Package },
  { href: '/admin/urunler/yeni', label: 'Yeni Ürün', icon: PlusCircle },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/giris') {
      router.push('/admin/giris');
    }
  }, [status, pathname, router]);

  if (pathname === '/admin/giris') return <>{children}</>;
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!session) return null;

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-dark-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="#1a1a1a" stroke="#c80d0d" strokeWidth="2"/>
                <circle cx="20" cy="20" r="10" fill="none" stroke="#c80d0d" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="4" fill="#c80d0d"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-lg tracking-widest text-white">İSLAMOĞLU</div>
              <div className="text-xs text-primary-500 tracking-[0.2em]">JANT • ADMIN</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  active
                    ? 'bg-primary-900/40 text-primary-400 border border-primary-800'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <item.icon size={18} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-dark-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {session.user?.name?.[0] || 'A'}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{session.user?.name}</div>
              <div className="text-dark-500 text-xs">{session.user?.email}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/giris' })}
            className="w-full flex items-center gap-3 px-4 py-3 text-dark-400 hover:text-primary-400 hover:bg-dark-800 rounded-xl transition-all text-sm"
          >
            <LogOut size={16} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
