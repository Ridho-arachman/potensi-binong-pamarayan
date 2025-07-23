import PotensiDetailClient from "@/components/PotensiDetailClient";

export async function PotensiDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <PotensiDetailClient id={id} />
    </section>
  );
}
