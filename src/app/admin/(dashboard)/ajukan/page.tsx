"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AjukanPotensiPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    contact: "",
    location: "",
    images: [] as File[],
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { id, value } = target;
    if (id === "images" && (target as HTMLInputElement).files) {
      const files = Array.from(
        (target as HTMLInputElement).files as FileList
      ).slice(0, 5);
      setForm((prev) => ({ ...prev, images: files }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleCategory = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.category ||
      !form.description ||
      !form.contact ||
      !form.location
    ) {
      toast("Gagal", { description: "Semua field wajib diisi!" });
      return;
    }
    setLoading(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("category", form.category);
      body.append("description", form.description);
      body.append("contact", form.contact);
      body.append("location", form.location);
      form.images.forEach((file) => body.append("images", file));
      const res = await fetch("/api/potensi", {
        method: "POST",
        body,
      });
      if (!res.ok) throw new Error("Gagal mengajukan potensi");
      toast("Potensi berhasil diajukan!", {
        description: "Data potensi sudah masuk ke database.",
      });
      router.push("/admin/kelola");
    } catch (err) {
      toast("Gagal", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ajukan Potensi</h1>
        <p className="text-gray-600">Ajukan potensi baru untuk Desa Binong</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Pengajuan Potensi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Judul Potensi</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul potensi"
                  value={form.title}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={handleCategory}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wisata">Wisata Alam</SelectItem>
                    <SelectItem value="umkm">UMKM</SelectItem>
                    <SelectItem value="budaya">Budaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Jelaskan detail potensi..."
                rows={5}
                value={form.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact">Kontak</Label>
                <Input
                  id="contact"
                  placeholder="Nomor telepon atau email"
                  value={form.contact}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  placeholder="Alamat atau lokasi"
                  value={form.location}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="images">Upload Gambar</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload gambar potensi (maksimal 5 file)
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/kelola")}
                disabled={loading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Mengirim..." : "Ajukan Potensi"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
