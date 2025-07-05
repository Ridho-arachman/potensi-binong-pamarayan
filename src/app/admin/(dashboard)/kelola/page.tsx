"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";

// Mock data untuk potensi
const mockPotensi = [
  {
    id: "1",
    title: "Sungai Ciujung",
    category: "Wisata Alam",
    status: "Published",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Warung Makan Sederhana",
    category: "UMKM",
    status: "Published",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Tari Jaipong",
    category: "Budaya",
    status: "Draft",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    title: "Kebun Buah Naga",
    category: "Wisata Alam",
    status: "Published",
    createdAt: "2024-01-01",
  },
];

export default function KelolaPotensiPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Potensi</h1>
          <p className="text-gray-600">Kelola semua potensi Desa Binong</p>
        </div>
        <Button>+ Tambah Potensi</Button>
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
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Tanggal</th>
                  <th className="text-left py-3 px-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockPotensi.map((potensi) => (
                  <tr key={potensi.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{potensi.title}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{potensi.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          potensi.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {potensi.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(potensi.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
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
