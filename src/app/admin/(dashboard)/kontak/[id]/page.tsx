"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            variant="ghost"
            size="sm"
            className="mb-4"
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
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Nama:</span> {data.nama}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {data.email}
              </div>
              <div>
                <span className="font-semibold">Nomor:</span> {data.nomor}
              </div>
              <div>
                <span className="font-semibold">Subjek:</span> {data.subjek}
              </div>
              <div>
                <span className="font-semibold">Pesan:</span>
                <div className="border rounded p-3 mt-1 bg-gray-50 whitespace-pre-line">
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
