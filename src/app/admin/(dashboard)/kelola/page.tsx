import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default async function KelolaPotensiPage() {
  // Ambil data potensi dari database
  const potensiList = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
  });

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
                      {potensi.createdAt instanceof Date
                        ? potensi.createdAt.toLocaleDateString("id-ID")
                        : new Date(potensi.createdAt).toLocaleDateString(
                            "id-ID"
                          )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/admin/kelola/${potensi.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
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
