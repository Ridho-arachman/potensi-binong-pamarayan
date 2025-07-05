import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajukan Potensi Baru | Desa Binong | Form Pengajuan",
  description: "Ajukan potensi wisata, UMKM, atau budaya baru untuk Desa Binong, Pamarayan. Form pengajuan mudah dan cepat untuk mendaftarkan potensi desa.",
  keywords: "ajukan potensi desa, form pengajuan, wisata baru, UMKM desa, budaya lokal, Desa Binong Pamarayan",
  openGraph: {
    title: "Ajukan Potensi Baru - Desa Binong",
    description: "Ajukan potensi wisata, UMKM, atau budaya baru untuk Desa Binong, Pamarayan.",
    type: "website",
    locale: "id_ID",
  },
};

export default function AjukanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 