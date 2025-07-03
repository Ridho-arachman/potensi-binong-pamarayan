import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-16 text-center bg-gradient-to-b from-white to-slate-50">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Eksplorasi Potensi Desa Binong
      </h1>
      <p className="mb-6 text-lg text-muted-foreground">
        Temukan potensi, peluang, dan keunikan Desa Binong, Pamarayan.
      </p>
      <Button asChild size="lg">
        <Link href="/potensi">Lihat Semua Potensi</Link>
      </Button>
    </section>
  );
}
