// src/components/admin/JantForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, Trash2, Image as ImageIcon, X, Plus } from 'lucide-react';
import { JANT_MARKALARI, ARABA_MARKALARI, BIJON_OLCULERI, JANT_INCLERI } from '@/lib/utils';
import { Jant } from '@prisma/client';

interface JantFormData {
  urun_adi: string;
  marka: string;
  model: string;
  jant_inci: number;
  jant_genisligi: string;
  et_degeri: number;
  bijon_olcusu: string;
  gobek_capi: string;
  aciklama: string;
  stok_adedi: number;
  durum: 'STOKTA' | 'SATILDI';
  fiyat: number;
  kapak_resmi: string;
  one_cikan: boolean;
}

interface Props {
  jant?: Jant;
}

export default function JantForm({ jant }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uyumluMarkalar, setUyumluMarkalar] = useState<string[]>(jant?.uyumlu_markalar || []);
  const [galeri, setGaleri] = useState<string[]>(jant?.galeri || []);
  const [yeniGaleriUrl, setYeniGaleriUrl] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<JantFormData>({
    defaultValues: jant ? {
      urun_adi: jant.urun_adi,
      marka: jant.marka,
      model: jant.model || '',
      jant_inci: jant.jant_inci,
      jant_genisligi: jant.jant_genisligi || '',
      et_degeri: jant.et_degeri || 0,
      bijon_olcusu: jant.bijon_olcusu || '',
      gobek_capi: jant.gobek_capi || '',
      aciklama: jant.aciklama || '',
      stok_adedi: jant.stok_adedi,
      durum: jant.durum,
      fiyat: jant.fiyat ? Number(jant.fiyat) : 0,
      kapak_resmi: jant.kapak_resmi || '',
      one_cikan: jant.one_cikan,
    } : {
      stok_adedi: 4,
      durum: 'STOKTA',
      jant_inci: 17,
      one_cikan: false,
    },
  });

  const toggleUyumlu = (marka: string) => {
    setUyumluMarkalar(prev =>
      prev.includes(marka) ? prev.filter(m => m !== marka) : [...prev, marka]
    );
  };

  const addGaleri = () => {
    if (yeniGaleriUrl.trim()) {
      setGaleri(prev => [...prev, yeniGaleriUrl.trim()]);
      setYeniGaleriUrl('');
    }
  };

  const onSubmit = async (data: JantFormData) => {
    setLoading(true);
    try {
      const payload = { ...data, uyumlu_markalar: uyumluMarkalar, galeri };
      const url = jant ? `/api/urunler/${jant.id}` : '/api/urunler';
      const method = jant ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Hata oluştu');
      }

      const result = await res.json();
      toast.success(jant ? 'Ürün güncellendi!' : 'Ürün eklendi!');
      router.push('/admin/urunler');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jant || !confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/urunler/${jant.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Ürün silindi');
      router.push('/admin/urunler');
    } catch {
      toast.error('Silme işlemi başarısız');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Temel Bilgiler */}
      <div className="card p-6">
        <h2 className="font-display text-lg tracking-wider text-white mb-5">TEMEL BİLGİLER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="label">Ürün Adı *</label>
            <input {...register('urun_adi', { required: true })} className="input" placeholder="BBS RS 17 5x112 ET35" />
          </div>
          <div>
            <label className="label">Marka *</label>
            <select {...register('marka', { required: true })} className="input">
              <option value="">Seçiniz</option>
              {JANT_MARKALARI.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Model</label>
            <input {...register('model')} className="input" placeholder="RS, Superturismo..." />
          </div>
        </div>
      </div>

      {/* Teknik Özellikler */}
      <div className="card p-6">
        <h2 className="font-display text-lg tracking-wider text-white mb-5">TEKNİK ÖZELLİKLER</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div>
            <label className="label">Jant İnç *</label>
            <select {...register('jant_inci', { required: true, valueAsNumber: true })} className="input">
              {JANT_INCLERI.map(i => <option key={i} value={i}>{i}&quot;</option>)}
            </select>
          </div>
          <div>
            <label className="label">Jant Genişliği (J)</label>
            <input {...register('jant_genisligi')} className="input" placeholder="7.5" />
          </div>
          <div>
            <label className="label">ET Değeri</label>
            <input {...register('et_degeri', { valueAsNumber: true })} type="number" className="input" placeholder="35" />
          </div>
          <div>
            <label className="label">Bijon Ölçüsü</label>
            <select {...register('bijon_olcusu')} className="input">
              <option value="">Seçiniz</option>
              {BIJON_OLCULERI.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Göbek Çapı (mm)</label>
            <input {...register('gobek_capi')} className="input" placeholder="66.5" />
          </div>
          <div>
            <label className="label">Stok Adedi</label>
            <input {...register('stok_adedi', { required: true, valueAsNumber: true })} type="number" min="0" className="input" />
          </div>
          <div>
            <label className="label">Fiyat (₺)</label>
            <input {...register('fiyat', { valueAsNumber: true })} type="number" min="0" className="input" placeholder="8500" />
          </div>
          <div>
            <label className="label">Durum</label>
            <select {...register('durum')} className="input">
              <option value="STOKTA">Stokta</option>
              <option value="SATILDI">Satıldı</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <input type="checkbox" id="one_cikan" {...register('one_cikan')} className="w-4 h-4 accent-primary-600" />
          <label htmlFor="one_cikan" className="text-dark-300 text-sm cursor-pointer">Öne çıkan ürün olarak işaretle</label>
        </div>
      </div>

      {/* Uyumlu Araçlar */}
      <div className="card p-6">
        <h2 className="font-display text-lg tracking-wider text-white mb-2">UYUMLU ARAÇ MARKALARI</h2>
        <p className="text-dark-500 text-sm mb-5">Seçilen: {uyumluMarkalar.join(', ') || 'Yok'}</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {ARABA_MARKALARI.map((marka) => (
            <button
              key={marka}
              type="button"
              onClick={() => toggleUyumlu(marka)}
              className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                uyumluMarkalar.includes(marka)
                  ? 'bg-primary-900/40 border-primary-700 text-primary-300'
                  : 'bg-dark-800 border-dark-700 text-dark-400 hover:border-dark-500'
              }`}
            >
              {marka}
            </button>
          ))}
        </div>
      </div>

      {/* Görseller */}
      <div className="card p-6">
        <h2 className="font-display text-lg tracking-wider text-white mb-5">GÖRSELLER</h2>
        <div className="mb-5">
          <label className="label">Kapak Fotoğrafı URL</label>
          <input {...register('kapak_resmi')} className="input" placeholder="https://..." />
        </div>
        <div>
          <label className="label">Galeri Görselleri</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={yeniGaleriUrl}
              onChange={(e) => setYeniGaleriUrl(e.target.value)}
              className="input text-sm"
              placeholder="https://..."
            />
            <button type="button" onClick={addGaleri} className="btn-secondary px-4 flex-shrink-0">
              <Plus size={16} />
            </button>
          </div>
          {galeri.length > 0 && (
            <div className="space-y-2">
              {galeri.map((url, i) => (
                <div key={i} className="flex items-center gap-2 bg-dark-800 rounded-lg px-3 py-2">
                  <ImageIcon size={14} className="text-dark-500 flex-shrink-0" />
                  <span className="text-dark-300 text-xs truncate flex-1">{url}</span>
                  <button type="button" onClick={() => setGaleri(prev => prev.filter((_, j) => j !== i))} className="text-dark-600 hover:text-primary-400">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Açıklama */}
      <div className="card p-6">
        <h2 className="font-display text-lg tracking-wider text-white mb-5">AÇIKLAMA</h2>
        <textarea {...register('aciklama')} rows={4} className="input resize-none" placeholder="Ürün açıklaması, durum bilgisi, notlar..." />
      </div>

      {/* Butonlar */}
      <div className="flex items-center justify-between gap-4">
        {jant && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="btn-outline border-primary-800 text-primary-500 hover:bg-primary-900 flex items-center gap-2"
          >
            <Trash2 size={16} /> {deleting ? 'Siliniyor...' : 'Ürünü Sil'}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2 ml-auto"
        >
          <Save size={16} /> {loading ? 'Kaydediliyor...' : jant ? 'Güncelle' : 'Ürün Ekle'}
        </button>
      </div>
    </form>
  );
}
