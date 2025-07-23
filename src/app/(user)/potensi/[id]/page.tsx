import PotensiDetailClient from "@/components/PotensiDetailClient";

type Props = {
  params: {
    id: string;
  };
};

export default async function PotensiDetailPage({ params }: Props) {
  const { id } = params;

  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <PotensiDetailClient id={id} />
    </section>
  );
}
