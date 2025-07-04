"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AjukanPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    contact: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, image: e.target.files?.[0] ?? null });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: submit ke API, upload gambar, dsb
    setTimeout(() => {
      setLoading(false);
      alert("Data berhasil dikirim (dummy)");
      console.log(form);
    }, 1200);
  }

  return (
    <section className="container py-12 flex flex-col items-center min-h-[80vh]">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-blue-900">
          Ajukan Potensi Baru
        </h1>
        <p className="text-slate-700 max-w-xl mx-auto">
          Isi form di bawah ini untuk mengajukan potensi desa yang belum
          terdata. Data Anda akan diverifikasi sebelum dipublikasikan.
        </p>
      </div>
      <Card className="w-full max-w-lg shadow-lg border-blue-100">
        <CardContent className="py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block mb-1 font-medium text-blue-900"
              >
                Nama Potensi *
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Contoh: Wisata Sungai Binong"
                required
                onChange={handleChange}
                className="focus-visible:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-1 font-medium text-blue-900"
              >
                Kategori *
              </label>
              <Input
                id="category"
                name="category"
                placeholder="Contoh: Wisata, UMKM, Budaya, dll"
                required
                onChange={handleChange}
                className="focus-visible:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-medium text-blue-900"
              >
                Deskripsi *
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Jelaskan potensi secara singkat dan jelas"
                required
                onChange={handleChange}
                className="focus-visible:ring-blue-400 min-h-[100px]"
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block mb-1 font-medium text-blue-900"
              >
                No. WhatsApp (opsional)
              </label>
              <Input
                id="contact"
                name="contact"
                placeholder="08xxxxxxxxxx"
                onChange={handleChange}
                className="focus-visible:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-1 font-medium text-blue-900"
              >
                Upload Gambar (opsional)
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {form.image && (
                <span className="text-xs text-slate-600 mt-1 block">
                  {form.image.name}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
