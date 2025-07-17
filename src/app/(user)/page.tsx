import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

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
  const potensiTerbaru = await prisma.potensi.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      mainImage: true,
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-30 bg-[url('/logo.jpeg')] bg-no-repeat bg-right-bottom bg-contain" />
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
          {potensiTerbaru.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-200 relative">
                {p.mainImage ? (
                  <Image
                    src={p.mainImage}
                    alt={p.title}
                    width={100}
                    height={100}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    📷
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <p className="text-sm text-blue-600 font-medium">
                  {p.category}
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/potensi/${p.id}`}>Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:mt-10">
          <Button asChild variant="outline" size="lg" className="px-6 sm:px-8">
            <Link href="/potensi">Lihat Semua Potensi</Link>
          </Button>
        </div>
      </section>

      {/* Section Statistik Potensi Desa */}
      <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-blue-900">
          Statistik Potensi Desa Binong Pamarayan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl shadow border border-blue-100 bg-white p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">🏪</span>
            <h3 className="font-bold text-blue-800 text-lg mb-1">UMKM</h3>
            <p className="text-2xl font-bold text-blue-900 mb-1">12</p>
            <span className="text-slate-500 text-sm">Total UMKM</span>
          </div>
          <div className="rounded-xl shadow border border-blue-100 bg-white p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">🌄</span>
            <h3 className="font-bold text-blue-800 text-lg mb-1">Wisata</h3>
            <p className="text-2xl font-bold text-blue-900 mb-1">5</p>
            <span className="text-slate-500 text-sm">Total Wisata</span>
          </div>
          <div className="rounded-xl shadow border border-blue-100 bg-white p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">👥</span>
            <h3 className="font-bold text-blue-800 text-lg mb-1">Pengunjung</h3>
            <p className="text-2xl font-bold text-blue-900 mb-1">1.200</p>
            <span className="text-slate-500 text-sm">Pengunjung Tahun Ini</span>
          </div>
          <div className="rounded-xl shadow border border-blue-100 bg-white p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">📈</span>
            <h3 className="font-bold text-blue-800 text-lg mb-1">
              Pertumbuhan
            </h3>
            <p className="text-2xl font-bold text-green-600 mb-1">10%</p>
            <span className="text-slate-500 text-sm">Pertumbuhan Bulanan</span>
          </div>
        </div>
      </section>

      {/* Section Keunggulan Desa Binong */}
      <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-blue-900">
          Mengapa Memilih Desa Binong?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <span className="text-4xl mb-3">🌳</span>
            <h3 className="font-bold text-blue-800 mb-2">Alam yang Asri</h3>
            <p className="text-slate-700">
              Dikelilingi sawah, sungai, dan udara segar, Desa Binong menawarkan
              pesona alam yang menenangkan dan cocok untuk wisata keluarga
              maupun edukasi.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <span className="text-4xl mb-3">🤝</span>
            <h3 className="font-bold text-blue-800 mb-2">
              Warga Ramah & Gotong Royong
            </h3>
            <p className="text-slate-700">
              Kehangatan dan kerjasama warga menjadi kekuatan utama dalam
              membangun desa yang inklusif, aman, dan nyaman untuk semua.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <span className="text-4xl mb-3">💡</span>
            <h3 className="font-bold text-blue-800 mb-2">
              UMKM & Budaya Kreatif
            </h3>
            <p className="text-slate-700">
              Banyak UMKM inovatif dan tradisi budaya yang terus dilestarikan,
              menciptakan peluang ekonomi dan wisata edukasi yang menarik.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
