// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum JantDurumu {
  STOKTA
  SATILDI
}

model Jant {
  id               Int        @id @default(autoincrement())
  urun_adi         String
  slug             String     @unique
  marka            String
  model            String?
  jant_inci        Int
  jant_genisligi   String?
  et_degeri        Int?
  bijon_olcusu     String?
  gobek_capi       String?
  uyumlu_markalar  String[]
  aciklama         String?
  stok_adedi       Int        @default(1)
  durum            JantDurumu @default(STOKTA)
  fiyat            Decimal?   @db.Decimal(10, 2)
  kapak_resmi      String?
  galeri           String[]
  one_cikan        Boolean    @default(false)
  eklenme_tarihi   DateTime   @default(now())
  guncelleme_tarihi DateTime  @updatedAt

  @@index([slug])
  @@index([jant_inci])
  @@index([marka])
  @@index([bijon_olcusu])
  @@index([durum])
}

model Admin {
  id         Int      @id @default(autoincrement())
  email      String   @unique
  password   String
  ad         String
  created_at DateTime @default(now())
}

model SiteAyarlari {
  id           Int    @id @default(1)
  site_adi     String @default("İslamoğlu Jant")
  iletisim_tel String?
  iletisim_email String?
  adres        String?
  whatsapp     String?
  instagram    String?
}
