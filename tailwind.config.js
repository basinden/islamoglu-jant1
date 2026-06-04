// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.admin.upsert({
    where: { email: 'admin@islamoglujant.com' },
    update: {},
    create: {
      email: 'admin@islamoglujant.com',
      password: hashedPassword,
      ad: 'Admin',
    },
  });

  // Site ayarları
  await prisma.siteAyarlari.upsert({
    where: { id: 1 },
    update: {},
    create: {
      site_adi: 'İslamoğlu Jant',
      iletisim_tel: '+90 555 123 45 67',
      iletisim_email: 'info@islamoglujant.com',
      adres: 'İstanbul, Türkiye',
      whatsapp: '+90 555 123 45 67',
    },
  });

  // Örnek ürünler
  const ornekUrunler = [
    {
      urun_adi: 'BBS RS 17" 5x112 ET35',
      slug: 'bbs-rs-17-5x112-et35',
      marka: 'BBS',
      model: 'RS',
      jant_inci: 17,
      jant_genisligi: '7.5',
      et_degeri: 35,
      bijon_olcusu: '5x112',
      gobek_capi: '66.5',
      uyumlu_markalar: ['Audi', 'Volkswagen', 'Seat', 'Skoda'],
      aciklama: 'Orijinal BBS RS serisi jant takımı. Çok iyi durumda, küçük çizik.',
      stok_adedi: 4,
      durum: 'STOKTA' as const,
      fiyat: 8500,
      one_cikan: true,
    },
    {
      urun_adi: 'OZ Racing Superturismo 18" 5x120',
      slug: 'oz-racing-superturismo-18-5x120',
      marka: 'OZ Racing',
      model: 'Superturismo',
      jant_inci: 18,
      jant_genisligi: '8.0',
      et_degeri: 40,
      bijon_olcusu: '5x120',
      gobek_capi: '72.6',
      uyumlu_markalar: ['BMW', 'MINI'],
      aciklama: 'OZ Racing Superturismo serisi. BMW E serisi uyumlu.',
      stok_adedi: 4,
      durum: 'STOKTA' as const,
      fiyat: 12000,
      one_cikan: true,
    },
    {
      urun_adi: 'Enkei RPF1 15" 4x100',
      slug: 'enkei-rpf1-15-4x100',
      marka: 'Enkei',
      model: 'RPF1',
      jant_inci: 15,
      jant_genisligi: '7.0',
      et_degeri: 28,
      bijon_olcusu: '4x100',
      gobek_capi: '67.1',
      uyumlu_markalar: ['Honda', 'Toyota', 'Mazda', 'Mitsubishi'],
      aciklama: 'Enkei RPF1 hafif yarış jantı. Japonya menşei.',
      stok_adedi: 2,
      durum: 'STOKTA' as const,
      fiyat: 5500,
      one_cikan: false,
    },
    {
      urun_adi: 'Borbet Type A 16" 5x114.3',
      slug: 'borbet-type-a-16-5x114-3',
      marka: 'Borbet',
      model: 'Type A',
      jant_inci: 16,
      jant_genisligi: '7.0',
      et_degeri: 38,
      bijon_olcusu: '5x114.3',
      gobek_capi: '67.1',
      uyumlu_markalar: ['Ford', 'Mazda', 'Nissan', 'Renault'],
      aciklama: 'Borbet klasik Type A model.',
      stok_adedi: 0,
      durum: 'SATILDI' as const,
      fiyat: 3200,
      one_cikan: false,
    },
  ];

  for (const urun of ornekUrunler) {
    await prisma.jant.upsert({
      where: { slug: urun.slug },
      update: {},
      create: urun,
    });
  }

  console.log('✅ Seed tamamlandı!');
  console.log('📧 Admin: admin@islamoglujant.com');
  console.log('🔑 Şifre: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
