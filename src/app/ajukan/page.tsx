"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AjukanPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    contact: "",
    image: null as File | null,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, image: e.target.files?.[0] ?? null });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit ke API, upload gambar, dsb
    console.log(form);
    alert("Data berhasil dikirim (dummy)");
  }

  return (
    <section className="container py-10 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Ajukan Potensi Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Nama Potensi"
          required
          onChange={handleChange}
        />
        <Input
          name="category"
          placeholder="Kategori"
          required
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Deskripsi"
          required
          onChange={handleChange}
        />
        <Input
          name="contact"
          placeholder="No. WhatsApp"
          onChange={handleChange}
        />
        <Input type="file" accept="image/*" onChange={handleFile} />
        <Button type="submit">Kirim</Button>
      </form>
    </section>
  );
}
