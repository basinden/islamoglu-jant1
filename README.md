// src/app/admin/ayarlar/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Ayarlar | Admin' };

export default function AyarlarPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl tracking-wider text-white mb-2">AYARLAR</h1>
      <p className="text-dark-400 mb-8">Site ve iletişim bilgilerini düzenleyin</p>
      <div className="card p-6 max-w-2xl">
        <h2 className="font-display text-lg tracking-wider text-white mb-5">İLETİŞİM BİLGİLERİ</h2>
        <div className="space-y-4">
          {[
            { label: 'Telefon', placeholder: '+90 555 123 45 67', type: 'tel' },
            { label: 'WhatsApp', placeholder: '+90 555 123 45 67', type: 'tel' },
            { label: 'E-posta', placeholder: 'info@islamoglujant.com', type: 'email' },
            { label: 'Adres', placeholder: 'İstanbul, Türkiye', type: 'text' },
            { label: 'Instagram', placeholder: '@islamoglujant', type: 'text' },
          ].map((f) => (
            <div key={f.label}>
              <label className="label">{f.label}</label>
              <input type={f.type} className="input" placeholder={f.placeholder} />
            </div>
          ))}
          <button className="btn-primary mt-2">Kaydet</button>
        </div>
      </div>
    </div>
  );
}
