import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami | Potensi Desa Binong",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang potensi Desa Binong, Pamarayan. Kami siap membantu Anda.",
  keywords: "kontak Desa Binong, informasi Desa Binong, Pamarayan",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
