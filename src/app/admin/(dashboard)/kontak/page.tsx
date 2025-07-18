"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminKontakList() {
  const [data, setData] = useState<Kontak[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/kontak");
        const json = await res.json();
        setData(json.data || []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="container py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesan Kontak</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Memuat data...
            </div>
          ) : !data.length ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada pesan masuk.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 border">Nama</th>
                    <th className="px-3 py-2 border">Email</th>
                    <th className="px-3 py-2 border">Subjek</th>
                    <th className="px-3 py-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((k) => (
                    <tr key={k.id}>
                      <td className="border px-2 py-1">{k.nama}</td>
                      <td className="border px-2 py-1">{k.email}</td>
                      <td className="border px-2 py-1">{k.subjek}</td>
                      <td className="border px-2 py-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/admin/kontak/${k.id}`)}
                        >
                          Lihat Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
