"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, User, Phone, Tag } from "lucide-react";

type Kontak = {
  id: string;
  nama: string;
  email: string;
  nomor: string;
  subjek: string;
  pesan: string;
};

export default function AdminKontakDetail() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<Kontak | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/kontak?id=${id}`);
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setData(json.data.find((k: Kontak) => k.id === id) || null);
        } else if (json.data && json.data.id === id) {
          setData(json.data);
        } else {
          setData(null);
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  return (
    <section className="container py-8 px-4 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Detail Pesan Kontak</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            size="sm"
            className="mb-4 cursor-pointer"
            onClick={() => router.back()}
          >
            &larr; Kembali ke daftar
          </Button>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Memuat data...
            </div>
          ) : !data ? (
            <div className="text-center py-8 text-muted-foreground">
              Pesan tidak ditemukan.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-700" />
                <span className="font-semibold min-w-[80px]">Nama</span>
                <span className="flex-1 border rounded bg-white px-3 py-2 ml-2">
                  {data.nama}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-700" />
                <span className="font-semibold min-w-[80px]">Email</span>
                <span className="flex-1 border rounded bg-white px-3 py-2 ml-2">
                  {data.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-700" />
                <span className="font-semibold min-w-[80px]">Nomor</span>
                <span className="flex-1 border rounded bg-white px-3 py-2 ml-2">
                  {data.nomor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-700" />
                <span className="font-semibold min-w-[80px]">Subjek</span>
                <span className="flex-1 border rounded bg-white px-3 py-2 ml-2">
                  {data.subjek}
                </span>
              </div>
              <div>
                <span className="font-semibold flex items-center gap-2 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                    />
                  </svg>
                  Pesan
                </span>
                <div className="border-2 border-blue-200 rounded bg-blue-50 p-4 mt-1 whitespace-pre-line break-words text-gray-900 shadow-sm">
                  {data.pesan}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
