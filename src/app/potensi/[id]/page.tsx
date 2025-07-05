import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = { params: { id: string } };

export default async function PotensiDetailPage({ params }: Props) {
  const potensi = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });

  if (!potensi) return notFound();

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <Card>
        {potensi.mainImage && (
          <img
            src={potensi.mainImage}
            alt={potensi.title}
            className="w-full h-48 sm:h-64 object-cover rounded-t"
          />
        )}
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
                <img
                  key={img.id}
                  src={img.url}
                  alt="Potensi"
                  className="w-full h-20 sm:h-28 object-cover rounded"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
