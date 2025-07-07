import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Store, Users, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  // Ambil data dari database
  const totalWisata = await prisma.potensi.count({
    where: { category: "wisata" },
  });
  const totalUMKM = await prisma.potensi.count({
    where: { category: "umkm" },
  });
  const totalPotensi = await prisma.potensi.count();
  // Ambil 3 potensi terbaru
  const aktivitasTerbaru = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  // Hitung statistik kategori
  const kategoriList = await prisma.potensi.groupBy({
    by: ["category"],
    _count: { category: true },
  });
  // Persentase kategori
  const kategoriStat = kategoriList.map((k) => ({
    category: k.category,
    percent:
      totalPotensi > 0
        ? Math.round((k._count.category / totalPotensi) * 100)
        : 0,
    count: k._count.category,
  }));

  // Contoh: pengunjung dan pertumbuhan bisa diisi manual/dari tabel lain jika ada
  const totalPengunjung = 1234; // Ganti dengan query jika ada tabel pengunjung
  const pertumbuhan = 15; // Ganti dengan query jika ada data pertumbuhan

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang di panel admin Potensi Desa Binong
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wisata</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWisata}</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total UMKM</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUMKM}</div>
            <p className="text-xs text-muted-foreground">+5 dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengunjung</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPengunjung}</div>
            <p className="text-xs text-muted-foreground">
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pertumbuhan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{pertumbuhan}%</div>
            <p className="text-xs text-muted-foreground">+2% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aktivitasTerbaru.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.category === "umkm"
                        ? "bg-green-500"
                        : item.category === "wisata"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}{" "}
                      Baru
                    </p>
                    <p className="text-xs text-gray-500">{item.title}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.createdAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kategoriStat.map((k) => (
                <div key={k.category}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {k.category.charAt(0).toUpperCase() + k.category.slice(1)}
                    </span>
                    <span className="text-sm font-medium">{k.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        k.category === "wisata"
                          ? "bg-blue-600"
                          : k.category === "umkm"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      }`}
                      style={{ width: `${k.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
