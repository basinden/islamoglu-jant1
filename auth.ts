// src/app/admin/urunler/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import prisma from '@/lib/prisma';
import JantForm from '@/components/admin/JantForm';

interface Props { params: { id: string } }

export const metadata: Metadata = { title: 'Ürün Düzenle | Admin' };

export default async function UrunDuzenlePage({ params }: Props) {
  const jant = await prisma.jant.findUnique({ where: { id: Number(params.id) } });
  if (!jant) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/urunler" className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm mb-4">
          <ArrowLeft size={16} /> Ürünlere Dön
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-wider text-white">ÜRÜN DÜZENLE</h1>
            <p className="text-dark-400 mt-1">{jant.urun_adi}</p>
          </div>
          <Link href={`/urunler/${jant.slug}`} target="_blank" className="btn-secondary flex items-center gap-2 text-sm">
            <ExternalLink size={15} /> Sayfayı Gör
          </Link>
        </div>
      </div>
      <JantForm jant={jant} />
    </div>
  );
}
