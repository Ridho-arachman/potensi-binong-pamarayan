"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Potensi = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
};

export default function KelolaPotensiPage() {
  const [potensiList, setPotensiList] = useState<Potensi[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/potensi");
      const data = await res.json();
      setPotensiList(data);
    }
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus potensi ini?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/potensi/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus potensi");
      toast("Berhasil", { description: "Potensi berhasil dihapus" });
      setPotensiList((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast("Gagal", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Potensi</h1>
          <p className="text-gray-600">Kelola semua potensi Desa Binong</p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/admin/ajukan">
            <span className="text-xl font-bold">+</span> Tambah Potensi
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Potensi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Judul</th>
                  <th className="text-left py-3 px-4 font-medium">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium">Tanggal</th>
                  <th className="text-left py-3 px-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {potensiList.map((potensi) => (
                  <tr key={potensi.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{potensi.title}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">
                        {potensi.category.charAt(0).toUpperCase() +
                          potensi.category.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(potensi.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link href={`/potensi/${potensi.id}`} target="_blank">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/kelola/${potensi.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => handleDelete(potensi.id)}
                          disabled={deletingId === potensi.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
