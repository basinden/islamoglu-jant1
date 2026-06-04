// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { JANT_INCLERI } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40">
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
              <div>
                <div className="font-display text-2xl tracking-widest text-white">İSLAMOĞLU</div>
                <div className="text-xs tracking-[0.3em] text-primary-500 font-semibold">JANT</div>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Türkiye&apos;nin en güvenilir ikinci el jant uzmanı. Geniş ürün yelpazemiz ve uygun fiyatlarımızla hizmetinizdeyiz.
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-4">KATEGORİLER</h3>
            <div className="h-0.5 w-8 bg-primary-600 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {JANT_INCLERI.map((inci) => (
                <Link
                  key={inci}
                  href={`/kategori/${inci}`}
                  className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {inci}&quot; İnç
                </Link>
              ))}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-4">HIZLI ERİŞİM</h3>
            <div className="h-0.5 w-8 bg-primary-600 mb-4" />
            <div className="space-y-3">
              <Link href="/urunler" className="block text-dark-400 hover:text-primary-400 transition-colors text-sm">Tüm Ürünler</Link>
              <Link href="/urunler?durum=STOKTA" className="block text-dark-400 hover:text-primary-400 transition-colors text-sm">Satılık Jantlar</Link>
              <Link href="/urunler?durum=SATILDI" className="block text-dark-400 hover:text-primary-400 transition-colors text-sm">Satılan Ürünler</Link>
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-white mb-4">İLETİŞİM</h3>
            <div className="h-0.5 w-8 bg-primary-600 mb-4" />
            <div className="space-y-3">
              <a href="tel:+905551234567" className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors text-sm group">
                <Phone size={16} className="text-primary-600 flex-shrink-0" />
                +90 555 123 45 67
              </a>
              <a href="https://wa.me/905551234567" className="flex items-center gap-3 text-dark-400 hover:text-green-400 transition-colors text-sm group">
                <MessageCircle size={16} className="text-green-600 flex-shrink-0" />
                WhatsApp
              </a>
              <a href="mailto:info@islamoglujant.com" className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors text-sm group">
                <Mail size={16} className="text-primary-600 flex-shrink-0" />
                info@islamoglujant.com
              </a>
              <span className="flex items-start gap-3 text-dark-400 text-sm">
                <MapPin size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                İstanbul, Türkiye
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} İslamoğlu Jant. Tüm hakları saklıdır.
          </p>
          <p className="text-dark-600 text-xs">
            İkinci El Jant Uzmanı
          </p>
        </div>
      </div>
    </footer>
  );
}
