"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [nama, setNama] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const router = useRouter();

  async function fetchData(
    filterNama = nama,
    filterFrom = from,
    filterTo = to
  ) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterNama) params.append("nama", filterNama);
      if (filterFrom) params.append("from", filterFrom);
      if (filterTo) params.append("to", filterTo);
      const res = await fetch(`/api/kontak?${params.toString()}`);
      const json = await res.json();
      setData(json.data || []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchData();
  }

  return (
    <section className="container py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesan Kontak</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form Pencarian */}
          <form
            className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            onSubmit={handleSearch}
          >
            <div>
              <Label htmlFor="nama">Cari Nama</Label>
              <Input
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama..."
              />
            </div>
            <div>
              <Label htmlFor="from">Dari Tanggal</Label>
              <Input
                id="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="to">Sampai Tanggal</Label>
              <Input
                id="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                Cari
              </Button>
            </div>
          </form>
          {/* List Card */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Memuat data...
            </div>
          ) : !data.length ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada pesan masuk.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.map((k) => (
                <div
                  key={k.id}
                  className="border rounded-lg p-4 flex flex-col bg-gray-50 h-full"
                >
                  <div className="flex-1 min-w-0 mb-4">
                    <div className="font-semibold text-blue-900 text-base mb-1">
                      {k.nama}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                      {k.email}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Subjek: <span className="font-medium">{k.subjek}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/admin/kontak/${k.id}`)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
