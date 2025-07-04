import { Mail, Instagram } from "lucide-react";

export default function KontakPage() {
  return (
    <section className="container py-10 max-w-2xl">
      <h1 className="font-heading text-2xl font-bold mb-4">
        Kontak & Sosial Media
      </h1>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <Mail size={18} /> Email:{" "}
          <a href="mailto:binongdesa@gmail.com" className="underline">
            binongdesa@gmail.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Instagram size={18} /> Instagram:{" "}
          <a
            href="https://instagram.com/binongdesa"
            className="underline"
            target="_blank"
          >
            binongdesa
          </a>
        </li>
      </ul>
    </section>
  );
}
