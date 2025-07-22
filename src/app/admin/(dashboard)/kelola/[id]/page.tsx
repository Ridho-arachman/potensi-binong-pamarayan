"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { toast } from "sonner";
import Image from "next/image";
import { potensiSchema } from "@/lib/zod";

export default function EditPotensiPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    contact: "",
    images: [] as File[],
    existingImages: [] as { id: string; url: string }[],
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/potensi/${id}`);
      if (!res.ok) {
        toast("Gagal", { description: "Data potensi tidak ditemukan" });
        router.push("/admin/kelola");
        return;
      }
      const data = await res.json();
      setForm({
        title: data.title,
        category: data.category,
        description: data.description,
        contact: data.contact || "",
        images: [],
        existingImages: data.images || [],
      });
      setLoading(false);
    };
    if (id) fetchData();
  }, [id, router]);

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
    setFormError(null);
  };

  const handleCategory = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
    setFormError(null);
  };

  const handleRemoveImage = (imgId: string) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img.id !== imgId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi Zod
    const result = potensiSchema.safeParse({
      title: form.title,
      category: form.category,
      description: form.description,
      contact: form.contact,
    });
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Data tidak valid.";
      setFormError(firstError);
      toast("Gagal", { description: firstError });
      return;
    }
    setIsPending(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("category", form.category);
      body.append("description", form.description);
      body.append("contact", form.contact);
      form.images.forEach((file) => body.append("images", file));
      body.append(
        "existingImageIds",
        JSON.stringify(form.existingImages.map((img) => img.id))
      );
      const res = await fetch(`/api/potensi/${id}`, {
        method: "PATCH",
        body,
      });
      if (!res.ok) throw new Error("Gagal update potensi");
      toast("Berhasil", { description: "Potensi berhasil diupdate!" });
      router.push("/admin/kelola");
    } catch (err) {
      toast("Gagal", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Potensi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {formError && (
              <div className="text-red-500 text-sm mb-2">{formError}</div>
            )}
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
              <Label htmlFor="images">Upload Gambar Baru</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload gambar tambahan (maksimal 5 file)
              </p>
            </div>
            {form.existingImages.length > 0 && (
              <div className="space-y-2">
                <Label>Gambar Saat Ini</Label>
                <div className="flex flex-wrap gap-2">
                  {form.existingImages.map((img) => (
                    <div key={img.id} className="relative group">
                      <Image
                        src={img.url}
                        alt="Gambar potensi"
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs group-hover:bg-red-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/kelola")}
                disabled={loading || isPending}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading || isPending}>
                {loading || isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
