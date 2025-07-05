import PotensiCard from "@/components/PotensiCard";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Potensi Desa Binong | Wisata, UMKM & Ekonomi Kreatif",
  description:
    "Jelajahi semua potensi Desa Binong, Pamarayan. Dari wisata alam Sungai Ciujung, UMKM kerajinan, hingga kuliner khas desa. Temukan peluang investasi dan kolaborasi.",
  keywords:
    "potensi desa Binong, wisata Pamarayan, UMKM desa, kerajinan bambu, kuliner lokal, investasi desa",
  openGraph: {
    title: "Daftar Potensi Desa Binong",
    description:
      "Jelajahi semua potensi wisata, UMKM, dan ekonomi kreatif Desa Binong, Pamarayan, Serang, Banten.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function PotensiListPage() {
  const potensi = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, category: true, mainImage: true },
  });

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-900">
        Daftar Potensi Desa
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {potensi.map((p) => (
          <PotensiCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
