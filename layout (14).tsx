// src/app/admin/urunler/yeni/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import JantForm from '@/components/admin/JantForm';

export const metadata: Metadata = { title: 'Yeni Ürün | Admin' };

export default function YeniUrunPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/urunler" className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft size={16} /> Ürünlere Dön
        </Link>
        <h1 className="font-display text-3xl tracking-wider text-white">YENİ ÜRÜN EKLE</h1>
      </div>
      <JantForm />
    </div>
  );
}
