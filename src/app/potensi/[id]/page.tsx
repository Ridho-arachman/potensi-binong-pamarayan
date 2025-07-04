import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = { params: { id: string } };

export default async function PotensiDetailPage({ params }: Props) {
  const potensi = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });

  if (!potensi) return notFound();

  return (
    <section className="container py-10">
      <Card>
        {potensi.mainImage && (
          <Image
            src={potensi.mainImage}
            alt={potensi.title}
            className="w-full h-64 object-cover rounded-t"
          />
        )}
        <CardContent>
          <h1 className="font-heading text-2xl font-bold mb-2">
            {potensi.title}
          </h1>
          <p className="text-muted-foreground mb-4">{potensi.category}</p>
          <p className="mb-4">{potensi.description}</p>
          {potensi.contact && (
            <Button asChild variant="outline">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
              {potensi.images.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt="Potensi"
                  className="w-full h-28 object-cover rounded"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
