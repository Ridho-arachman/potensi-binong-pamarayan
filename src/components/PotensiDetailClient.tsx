"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Potensi = {
  id: string;
  title: string;
  category: string;
  description: string;
  contact: string | null;
  mainImage: string | null;
  images: { id: string; url: string | null }[];
};

type Props = { id: string };

export default function PotensiDetailClient({ id }: Props) {
  const [data, setData] = useState<Potensi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/potensi/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Data tidak ditemukan");
        return res.json();
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Data tidak ditemukan.</div>;

  return (
    <Card>
      <div className="w-full h-48 sm:h-64 bg-gray-200 relative rounded-t">
        {data.mainImage ? (
          <Image
            src={data.mainImage}
            alt={data.title}
            fill
            className="object-cover rounded-t"
            style={{ objectPosition: "center" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            📷
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
          {data.title}
        </h1>
        <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
          {data.category}
        </p>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          {data.description}
        </p>
        {data.contact && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a
              href={`https://wa.me/${data.contact.replace(/^0/, "62")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Kontak WhatsApp
            </a>
          </Button>
        )}
        {data.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8">
            {data.images.map((img) => (
              <div
                key={img.id}
                className="w-full h-20 sm:h-28 bg-gray-200 rounded flex items-center justify-center text-gray-500 overflow-hidden"
              >
                {img.url ? (
                  <Image
                    src={img.url}
                    alt={data.title}
                    width={120}
                    height={80}
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    📷
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
