import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

type Props = { params: { id: string } };

export default async function PotensiDetailPage({ params }: Props) {
  const potensi = await prisma.potensi.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      contact: true,
      mainImage: true,
      images: { select: { id: true, url: true } },
    },
  });

  if (!potensi) return notFound();

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <Card>
        <div className="w-full h-48 sm:h-64 bg-gray-200 relative rounded-t">
          {potensi.mainImage ? (
            <Image
              src={potensi.mainImage}
              alt={potensi.title}
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
                  className="w-full h-20 sm:h-28 bg-gray-200 rounded flex items-center justify-center text-gray-500 overflow-hidden"
                >
                  {img.url ? (
                    <Image
                      src={img.url}
                      alt={potensi.title}
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
    </section>
  );
}
