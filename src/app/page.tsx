import PotensiCard from "@/components/PotensiCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const potensi = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, category: true, mainImage: true },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-30 bg-[url('/globe.svg')] bg-no-repeat bg-right-bottom bg-contain" />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 drop-shadow-sm tracking-tight">
            Selamat Datang di Website
            <span className="block text-blue-700">Potensi Desa Binong</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Eksplorasi potensi, peluang, dan keunggulan Desa Binong, Kecamatan
            Pamarayan. Bersama kita majukan desa dengan inovasi dan kolaborasi.
          </p>
          <Button asChild size="lg" className="px-8 text-base">
            <Link href="/potensi">Jelajahi Potensi Desa</Link>
          </Button>
        </div>
      </section>

      {/* Potensi Terbaru */}
      <section className="container py-14">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-blue-900">
          Potensi Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {potensi.map((p) => (
            <PotensiCard key={p.id} {...p} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/potensi">Lihat Semua Potensi</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
