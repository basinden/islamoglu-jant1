// src/types/index.ts
import { Jant as PrismaJant } from '@prisma/client';

export type { PrismaJant as Jant };

export type JantDurumu = 'STOKTA' | 'SATILDI';

export interface JantFiltrele {
  inci?: number;
  marka?: string;
  bijon?: string;
  et?: number;
  uyumlu?: string;
  durum?: JantDurumu | 'HEPSI';
  arama?: string;
  sayfa?: number;
  sayfa_boyutu?: number;
}

export interface JantForm {
  urun_adi: string;
  marka: string;
  model?: string;
  jant_inci: number;
  jant_genisligi?: string;
  et_degeri?: number;
  bijon_olcusu?: string;
  gobek_capi?: string;
  uyumlu_markalar: string[];
  aciklama?: string;
  stok_adedi: number;
  durum: JantDurumu;
  fiyat?: number;
  kapak_resmi?: string;
  galeri?: string[];
  one_cikan: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  sayfa: number;
  sayfa_boyutu: number;
  toplam_sayfa: number;
}

export interface DashboardStats {
  toplam: number;
  stokta: number;
  satildi: number;
  dusuk_stok: number;
  son_eklenenler: PrismaJant[];
}
