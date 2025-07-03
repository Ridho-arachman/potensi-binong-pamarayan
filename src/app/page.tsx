import Hero from "@/components/Hero";
import PotensiCard from "@/components/PotensiCard";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const potensi = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, category: true, mainImage: true },
  });

  return (
    <>
      <Hero />
      <section className="container py-10">
        <h2 className="text-xl font-semibold mb-4">Potensi Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {potensi.map((p) => (
            <PotensiCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
