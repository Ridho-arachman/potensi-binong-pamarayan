import PotensiDetailClient from "@/components/PotensiDetailClient";

export default function PotensiDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <PotensiDetailClient id={params.id} />
    </section>
  );
}
