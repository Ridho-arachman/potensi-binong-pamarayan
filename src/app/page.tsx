import PotensiCard from "@/components/PotensiCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Potensi Desa Binong - Beranda | Wisata, UMKM & Budaya Pamarayan",
  description:
    "Selamat datang di website resmi Potensi Desa Binong, Kecamatan Pamarayan, Serang, Banten. Temukan wisata alam, UMKM kreatif, dan budaya lokal yang menarik.",
  keywords:
    "Desa Binong, Pamarayan, wisata desa, UMKM, budaya lokal, Serang Banten, potensi desa",
  openGraph: {
    title: "Potensi Desa Binong - Beranda",
    description:
      "Temukan wisata alam, UMKM kreatif, dan budaya lokal Desa Binong, Pamarayan, Serang, Banten.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function HomePage() {
  const potensi = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, category: true, mainImage: true },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-30 bg-[url('/globe.svg')] bg-no-repeat bg-right-bottom bg-contain" />
        <div className="container relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 text-blue-900 drop-shadow-sm tracking-tight">
            Selamat Datang di Website
            <span className="block text-blue-700">Potensi Desa Binong</span>
          </h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto px-4">
            Eksplorasi potensi, peluang, dan keunggulan Desa Binong, Kecamatan
            Pamarayan. Bersama kita majukan desa dengan inovasi dan kolaborasi.
          </p>
          <Button
            asChild
            size="lg"
            className="px-6 sm:px-8 text-sm sm:text-base"
          >
            <Link href="/potensi">Jelajahi Potensi Desa</Link>
          </Button>
        </div>
      </section>

      {/* Potensi Terbaru */}
      <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-blue-900">
          Potensi Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {potensi.map((p) => (
            <PotensiCard key={p.id} {...p} />
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:mt-10">
          <Button asChild variant="outline" size="lg" className="px-6 sm:px-8">
            <Link href="/potensi">Lihat Semua Potensi</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
