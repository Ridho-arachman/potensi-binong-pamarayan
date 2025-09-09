import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

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
  const potensiList = await prisma.potensi.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      mainImage: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-900">
        Daftar Potensi Desa
      </h1>
      {potensiList.length === 0 ? (
        <div className="text-center text-gray-500  text-lg font-medium min-h-[50vh] flex items-center justify-center">
          Belum ada data potensi desa.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {potensiList.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-200 relative">
                {p.mainImage ? (
                  <Image
                    src={p.mainImage}
                    alt={p.title}
                    width={700}
                    height={170}
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
      )}
    </section>
  );
}
