import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Mock data untuk sementara
const mockPotensi = [
  {
    id: "1",
    title: "Sungai Ciujung",
    category: "Wisata Alam",
    mainImage: "/placeholder.jpg",
  },
  {
    id: "2",
    title: "Warung Makan Sederhana",
    category: "UMKM",
    mainImage: "/placeholder.jpg",
  },
  {
    id: "3",
    title: "Tari Jaipong",
    category: "Budaya",
    mainImage: "/placeholder.jpg",
  },
  {
    id: "4",
    title: "Kebun Buah Naga",
    category: "Wisata Alam",
    mainImage: "/placeholder.jpg",
  },
  {
    id: "5",
    title: "Kerajinan Bambu",
    category: "UMKM",
    mainImage: "/placeholder.jpg",
  },
  {
    id: "6",
    title: "Festival Desa",
    category: "Budaya",
    mainImage: "/placeholder.jpg",
  },
];

export default function PotensiListPage() {
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-900">
        Daftar Potensi Desa
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {mockPotensi.map((p) => (
          <Card
            key={p.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                📷
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <p className="text-sm text-blue-600 font-medium">{p.category}</p>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/potensi/${p.id}`}>Lihat Detail</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
