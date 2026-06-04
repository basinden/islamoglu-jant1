// src/components/admin/UrunAksiyon.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  jantId: number;
  durum: string;
}

export default function AdminUrunAksiyon({ jantId, durum }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    try {
      const yeniDurum = durum === 'STOKTA' ? 'SATILDI' : 'STOKTA';
      const res = await fetch(`/api/urunler/${jantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durum: yeniDurum }),
      });
      if (!res.ok) throw new Error();
      toast.success(yeniDurum === 'SATILDI' ? 'Satıldı olarak işaretlendi' : 'Stokta olarak güncellendi');
      router.refresh();
    } catch {
      toast.error('Güncelleme başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all disabled:opacity-50 ${
        durum === 'SATILDI'
          ? 'bg-primary-900/40 text-primary-400 border-primary-800 hover:bg-green-900/40 hover:text-green-400 hover:border-green-800'
          : 'bg-green-900/40 text-green-400 border-green-800 hover:bg-primary-900/40 hover:text-primary-400 hover:border-primary-800'
      }`}
    >
      {loading ? '...' : durum === 'SATILDI' ? '● Satıldı' : '● Stokta'}
    </button>
  );
}
