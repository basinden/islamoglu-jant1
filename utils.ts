// src/app/admin/urunler/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Eye, Search } from 'lucide-react';
import prisma from '@/lib/prisma';
import { formatPrice, formatDate, buildImageUrl } from '@/lib/utils';
import AdminUrunAksiyon from '@/components/admin/UrunAksiyon';

export const metadata: Metadata = { title: 'Ürünler | Admin' };

interface SearchParams { arama?: string; durum?: string; sayfa?: string; }

export default async function AdminUrunlerPage({ searchParams }: { searchParams: SearchParams }) {
  const sayfa = Number(searchParams.sayfa || 1);
  const sayfaBoyutu = 20;
  const skip = (sayfa - 1) * sayfaBoyutu;

  const where: any = {};
  if (searchParams.arama) {
    where.OR = [
      { urun_adi: { contains: searchParams.arama, mode: 'insensitive' } },
      { marka: { contains: searchParams.arama, mode: 'insensitive' } },
    ];
  }
  if (searchParams.durum) where.durum = searchParams.durum;

  const [jantlar, toplam] = await Promise.all([
    prisma.jant.findMany({ where, orderBy: { eklenme_tarihi: 'desc' }, skip, take: sayfaBoyutu }),
    prisma.jant.count({ where }),
  ]);

  const toplamSayfa = Math.ceil(toplam / sayfaBoyutu);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-wider text-white">ÜRÜNLER</h1>
          <p className="text-dark-400 mt-1">{toplam} ürün</p>
        </div>
        <Link href="/admin/urunler/yeni" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Yeni Ürün Ekle
        </Link>
      </div>

      {/* Filtreler */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <form className="flex-1 min-w-64 relative">
          <input
            type="text"
            name="arama"
            defaultValue={searchParams.arama}
            placeholder="Ürün veya marka ara..."
            className="input pl-10 text-sm"
          />
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
        </form>
        <div className="flex gap-2">
          {[
            { label: 'Tümü', value: '' },
            { label: 'Stokta', value: 'STOKTA' },
            { label: 'Satıldı', value: 'SATILDI' },
          ].map((opt) => (
            <Link
              key={opt.value}
              href={`/admin/urunler?${opt.value ? `durum=${opt.value}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (searchParams.durum || '') === opt.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Tablo */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-800">
                <th className="text-left text-xs text-dark-500 uppercase tracking-wider px-6 py-4 font-semibold">Ürün</th>
                <th className="text-left text-xs text-dark-500 uppercase tracking-wider px-4 py-4 font-semibold hidden lg:table-cell">Teknik</th>
                <th className="text-left text-xs text-dark-500 uppercase tracking-wider px-4 py-4 font-semibold">Fiyat</th>
                <th className="text-left text-xs text-dark-500 uppercase tracking-wider px-4 py-4 font-semibold">Durum</th>
                <th className="text-left text-xs text-dark-500 uppercase tracking-wider px-4 py-4 font-semibold hidden md:table-cell">Tarih</th>
                <th className="text-right text-xs text-dark-500 uppercase tracking-wider px-6 py-4 font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800/50">
              {jantlar.map((jant) => (
                <tr key={jant.id} className="hover:bg-dark-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-dark-800 flex-shrink-0">
                        <Image src={buildImageUrl(jant.kapak_resmi)} alt={jant.urun_adi} fill className="object-cover" sizes="48px"/>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{jant.urun_adi}</div>
                        <div className="text-dark-500 text-xs">{jant.marka} {jant.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      <span className="text-xs bg-dark-800 border border-dark-700 text-dark-400 px-2 py-0.5 rounded font-mono">{jant.jant_inci}&quot;</span>
                      {jant.bijon_olcusu && <span className="text-xs bg-dark-800 border border-dark-700 text-dark-400 px-2 py-0.5 rounded font-mono">{jant.bijon_olcusu}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-primary-400 font-display">{jant.fiyat ? formatPrice(Number(jant.fiyat)) : '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <AdminUrunAksiyon jantId={jant.id} durum={jant.durum} />
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-dark-500 text-xs">{formatDate(jant.eklenme_tarihi)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/urunler/${jant.slug}`} target="_blank" className="p-2 text-dark-500 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-all">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/urunler/${jant.id}`} className="p-2 text-dark-500 hover:text-white hover:bg-dark-800 rounded-lg transition-all">
                        <Edit size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {toplamSayfa > 1 && (
          <div className="flex justify-center gap-2 p-6 border-t border-dark-800">
            {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/urunler?sayfa=${p}${searchParams.durum ? `&durum=${searchParams.durum}` : ''}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${p === sayfa ? 'bg-primary-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
