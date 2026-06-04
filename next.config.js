// src/app/admin/dashboard/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Package, CheckCircle, AlertTriangle, TrendingUp, Plus, ExternalLink } from 'lucide-react';
import prisma from '@/lib/prisma';
import { formatPrice, formatDate, buildImageUrl } from '@/lib/utils';

export const metadata: Metadata = { title: 'Dashboard | Admin' };

async function getDashboardData() {
  const [toplam, stokta, satildi, dusukStok, sonEklenenler] = await Promise.all([
    prisma.jant.count(),
    prisma.jant.count({ where: { durum: 'STOKTA' } }),
    prisma.jant.count({ where: { durum: 'SATILDI' } }),
    prisma.jant.count({ where: { durum: 'STOKTA', stok_adedi: { lte: 1 } } }),
    prisma.jant.findMany({
      orderBy: { eklenme_tarihi: 'desc' },
      take: 5,
    }),
  ]);
  return { toplam, stokta, satildi, dusukStok, sonEklenenler };
}

export default async function DashboardPage() {
  const { toplam, stokta, satildi, dusukStok, sonEklenenler } = await getDashboardData();

  const statCards = [
    { label: 'Toplam Ürün', value: toplam, icon: Package, color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-800' },
    { label: 'Stokta', value: stokta, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-900/20 border-green-800' },
    { label: 'Satıldı', value: satildi, icon: CheckCircle, color: 'text-primary-400', bg: 'bg-primary-900/20 border-primary-800' },
    { label: 'Düşük Stok', value: dusukStok, icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-800' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-wider text-white">DASHBOARD</h1>
          <p className="text-dark-400 mt-1">Hoş geldiniz, genel duruma göz atın</p>
        </div>
        <Link href="/admin/urunler/yeni" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Yeni Ürün
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((stat) => (
          <div key={stat.label} className={`card border ${stat.bg} p-6`}>
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={stat.color} size={22} />
            </div>
            <div className={`font-display text-4xl tracking-wider ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-dark-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Son Eklenenler */}
      <div className="card">
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <h2 className="font-display text-xl tracking-wider text-white">SON EKLENEN ÜRÜNLER</h2>
          <Link href="/admin/urunler" className="text-primary-500 hover:text-primary-400 text-sm flex items-center gap-1">
            Tümünü Gör <ExternalLink size={13} />
          </Link>
        </div>
        <div className="divide-y divide-dark-800">
          {sonEklenenler.map((jant) => (
            <div key={jant.id} className="flex items-center gap-4 p-4 hover:bg-dark-800/50 transition-colors">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-dark-800 flex-shrink-0">
                <Image src={buildImageUrl(jant.kapak_resmi)} alt={jant.urun_adi} fill className="object-cover" sizes="56px"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{jant.urun_adi}</div>
                <div className="text-dark-500 text-xs mt-0.5">{jant.marka} • {jant.jant_inci}&quot; • {formatDate(jant.eklenme_tarihi)}</div>
              </div>
              <div className="flex items-center gap-3">
                {jant.fiyat && (
                  <span className="text-primary-400 font-display text-lg hidden sm:block">
                    {formatPrice(Number(jant.fiyat))}
                  </span>
                )}
                <span className={jant.durum === 'SATILDI' ? 'badge-satildi' : 'badge-stokta'}>
                  {jant.durum === 'SATILDI' ? 'Satıldı' : 'Stokta'}
                </span>
                <Link
                  href={`/admin/urunler/${jant.id}`}
                  className="p-2 text-dark-500 hover:text-white hover:bg-dark-700 rounded-lg transition-all"
                >
                  <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Düşük stok uyarısı */}
      {dusukStok > 0 && (
        <div className="mt-6 bg-yellow-900/20 border border-yellow-800 rounded-xl p-5 flex items-start gap-4">
          <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <div className="text-yellow-300 font-semibold mb-1">Düşük Stok Uyarısı</div>
            <p className="text-yellow-500 text-sm">
              {dusukStok} ürünün stoğu kritik seviyede (1 veya altında).
              <Link href="/admin/urunler?dusuk_stok=true" className="text-yellow-300 hover:underline ml-1">
                İncele →
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
