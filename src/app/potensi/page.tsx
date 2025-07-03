import PotensiCard from "@/components/PotensiCard";
import prisma from "@/lib/prisma";

export default async function PotensiListPage() {
  const potensi = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, category: true, mainImage: true },
  });

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Daftar Potensi Desa</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {potensi.map((p) => (
          <PotensiCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
