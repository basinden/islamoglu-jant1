// src/components/product/FiltreSidebar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { JANT_MARKALARI, ARABA_MARKALARI, BIJON_OLCULERI, JANT_INCLERI } from '@/lib/utils';

interface FiltreSidebarProps {
  toplam: number;
}

export default function FiltreSidebar({ toplam }: FiltreSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = (key: string) => searchParams.get(key) || '';

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('sayfa'); // Reset page
    router.push(`/urunler?${params.toString()}`);
  }, [router, searchParams]);

  const clearAll = () => router.push('/urunler');

  const hasFilters = ['inci', 'marka', 'bijon', 'uyumlu', 'durum'].some(k => searchParams.has(k));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-primary-500" />
          <span className="font-semibold text-white">Filtreler</span>
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary-500 hover:text-primary-400 flex items-center gap-1">
            <X size={12} /> Temizle
          </button>
        )}
      </div>
      <div className="text-sm text-dark-400">{toplam} ürün bulundu</div>

      {/* Durum */}
      <div>
        <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">Durum</h4>
        <div className="space-y-2">
          {[
            { label: 'Tümü', value: '' },
            { label: 'Satılık', value: 'STOKTA' },
            { label: 'Satıldı', value: 'SATILDI' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="durum"
                value={opt.value}
                checked={getParam('durum') === opt.value}
                onChange={() => updateFilter('durum', opt.value)}
                className="accent-primary-600 w-4 h-4"
              />
              <span className="text-dark-300 group-hover:text-white transition-colors text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* İnç */}
      <div>
        <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">Jant İnç</h4>
        <div className="grid grid-cols-4 gap-2">
          {JANT_INCLERI.map((inci) => (
            <button
              key={inci}
              onClick={() => updateFilter('inci', getParam('inci') === String(inci) ? '' : String(inci))}
              className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                getParam('inci') === String(inci)
                  ? 'bg-primary-600 border-primary-500 text-white'
                  : 'bg-dark-800 border-dark-700 text-dark-300 hover:border-dark-500 hover:text-white'
              }`}
            >
              {inci}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Marka */}
      <div>
        <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">Jant Markası</h4>
        <select
          value={getParam('marka')}
          onChange={(e) => updateFilter('marka', e.target.value)}
          className="input text-sm"
        >
          <option value="">Tümü</option>
          {JANT_MARKALARI.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Bijon */}
      <div>
        <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">Bijon Ölçüsü</h4>
        <select
          value={getParam('bijon')}
          onChange={(e) => updateFilter('bijon', e.target.value)}
          className="input text-sm"
        >
          <option value="">Tümü</option>
          {BIJON_OLCULERI.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Uyumlu araç */}
      <div>
        <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-3">Uyumlu Araç</h4>
        <select
          value={getParam('uyumlu')}
          onChange={(e) => updateFilter('uyumlu', e.target.value)}
          className="input text-sm"
        >
          <option value="">Tümü</option>
          {ARABA_MARKALARI.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
