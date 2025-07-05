import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

type Props = { params: { id: string } };

// Mock data untuk sementara
const mockPotensiData = {
  "1": {
    id: "1",
    title: "Sungai Ciujung",
    category: "Wisata Alam",
    description:
      "Sungai Ciujung adalah sungai yang mengalir di Desa Binong dengan pemandangan yang indah. Sungai ini menjadi salah satu destinasi wisata alam yang menarik bagi pengunjung. Air sungai yang jernih dan lingkungan yang asri membuat tempat ini cocok untuk rekreasi keluarga.",
    contact: "08123456789",
    mainImage: "/placeholder.jpg",
    images: [
      { id: "1", url: "/placeholder.jpg" },
      { id: "2", url: "/placeholder.jpg" },
      { id: "3", url: "/placeholder.jpg" },
    ],
  },
  "2": {
    id: "2",
    title: "Warung Makan Sederhana",
    category: "UMKM",
    description:
      "Warung Makan Sederhana menyajikan berbagai masakan tradisional khas Desa Binong. Dengan bahan-bahan segar dan resep turun temurun, warung ini menjadi favorit warga lokal dan pengunjung.",
    contact: "08123456788",
    mainImage: "/placeholder.jpg",
    images: [
      { id: "4", url: "/placeholder.jpg" },
      { id: "5", url: "/placeholder.jpg" },
    ],
  },
  "3": {
    id: "3",
    title: "Tari Jaipong",
    category: "Budaya",
    description:
      "Tari Jaipong adalah tarian tradisional yang masih dilestarikan di Desa Binong. Tarian ini biasanya ditampilkan pada acara-acara adat dan perayaan desa.",
    contact: "08123456787",
    mainImage: "/placeholder.jpg",
    images: [
      { id: "6", url: "/placeholder.jpg" },
      { id: "7", url: "/placeholder.jpg" },
      { id: "8", url: "/placeholder.jpg" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const potensi = mockPotensiData[params.id as keyof typeof mockPotensiData];

  if (!potensi) {
    return {
      title: "Potensi Tidak Ditemukan | Desa Binong",
      description:
        "Potensi yang Anda cari tidak ditemukan di Desa Binong, Pamarayan.",
    };
  }

  return {
    title: `${potensi.title} - Potensi Desa Binong | ${potensi.category}`,
    description:
      potensi.description.length > 160
        ? potensi.description.substring(0, 160) + "..."
        : potensi.description,
    keywords: `${potensi.title}, ${potensi.category}, Desa Binong, Pamarayan, potensi desa, wisata lokal`,
    openGraph: {
      title: potensi.title,
      description:
        potensi.description.length > 160
          ? potensi.description.substring(0, 160) + "..."
          : potensi.description,
      type: "article",
      locale: "id_ID",
    },
  };
}

export default function PotensiDetailPage({ params }: Props) {
  const potensi = mockPotensiData[params.id as keyof typeof mockPotensiData];

  if (!potensi) return notFound();

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <Card>
        <div className="w-full h-48 sm:h-64 bg-gray-200 relative rounded-t">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            📷
          </div>
        </div>
        <CardContent className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
            {potensi.title}
          </h1>
          <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            {potensi.category}
          </p>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            {potensi.description}
          </p>
          {potensi.contact && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a
                href={`https://wa.me/${potensi.contact.replace(/^0/, "62")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Kontak WhatsApp
              </a>
            </Button>
          )}
          {potensi.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8">
              {potensi.images.map((img) => (
                <div
                  key={img.id}
                  className="w-full h-20 sm:h-28 bg-gray-200 rounded flex items-center justify-center text-gray-500"
                >
                  📷
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
