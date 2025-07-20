import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Store, Users, TrendingUp, Mail } from "lucide-react";
import ChartStatistik from "./VisitorChart";

export const metadata = {
  title: "Dashboard Admin | Desa Binong",
  description: "Panel admin untuk mengelola potensi Desa Binong.",
};

// Fungsi format tanggal Indonesia
function formatTanggalIndo(dateString: string | Date | undefined): string {
  if (!dateString) return "Belum ada data";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  // Ambil data dari database
  const totalWisata = await prisma.potensi.count({
    where: { category: "wisata" },
  });
  const totalUMKM = await prisma.potensi.count({
    where: { category: "umkm" },
  });
  const totalPotensi = await prisma.potensi.count();
  const totalBudaya = await prisma.potensi.count({
    where: { category: "budaya" },
  });
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

  // Hitung pengunjung bulan ini
  const now = new Date();
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const totalPengunjung = await prisma.visitor.count({
    where: {
      createdAt: {
        gte: firstDayThisMonth,
        lte: now,
      },
    },
  });

  // Hitung pertumbuhan potensi bulan ini vs bulan lalu
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );

  const potensiThisMonth = await prisma.potensi.count({
    where: {
      createdAt: {
        gte: firstDayThisMonth,
        lte: now,
      },
    },
  });
  const potensiLastMonth = await prisma.potensi.count({
    where: {
      createdAt: {
        gte: firstDayLastMonth,
        lte: lastDayLastMonth,
      },
    },
  });
  let pertumbuhan = 0;
  if (potensiLastMonth === 0 && potensiThisMonth > 0) {
    pertumbuhan = 100;
  } else if (potensiLastMonth === 0 && potensiThisMonth === 0) {
    pertumbuhan = 0;
  } else {
    pertumbuhan = Math.round(
      ((potensiThisMonth - potensiLastMonth) / potensiLastMonth) * 100
    );
  }

  // Ambil potensi terbaru per kategori
  const lastWisata = await prisma.potensi.findFirst({
    where: { category: "wisata" },
    orderBy: { createdAt: "desc" },
    select: { title: true, createdAt: true },
  });
  const lastUMKM = await prisma.potensi.findFirst({
    where: { category: "umkm" },
    orderBy: { createdAt: "desc" },
    select: { title: true, createdAt: true },
  });
  const lastBudaya = await prisma.potensi.findFirst({
    where: { category: "budaya" },
    orderBy: { createdAt: "desc" },
    select: { title: true, createdAt: true },
  });

  // Ambil statistik kontak
  const totalKontak = await prisma.kontak.count();
  const kontakTerbaru = await prisma.kontak.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, nama: true, subjek: true, createdAt: true },
  });

  // Data chart pengunjung 12 bulan terakhir
  const chartData: { bulan: string; jumlah: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const jumlah = await prisma.visitor.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextMonth,
        },
      },
    });
    const bulan = date.toLocaleString("id-ID", {
      month: "short",
      year: "2-digit",
    });
    chartData.push({ bulan, jumlah });
  }

  // Data chart statistik 12 bulan terakhir
  const chartStat = async (category?: string) => {
    const arr: { label: string; value: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      let value = 0;
      if (category === "visitor") {
        value = await prisma.visitor.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        });
      } else if (category) {
        value = await prisma.potensi.count({
          where: {
            category,
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        });
      } else if (category === "pertumbuhan") {
        // skip, handled below
      }
      const label = date.toLocaleString("id-ID", {
        month: "short",
        year: "2-digit",
      });
      arr.push({ label, value });
    }
    return arr;
  };
  const chartUMKM = await chartStat("umkm");
  const chartWisata = await chartStat("wisata");
  const chartBudaya = await chartStat("budaya");
  const chartVisitor = await chartStat("visitor");
  // Pertumbuhan: hitung persentase pertumbuhan potensi per bulan
  const chartPertumbuhan: { label: string; value: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const endPrevMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
      23,
      59,
      59,
      999
    );
    const thisMonth = await prisma.potensi.count({
      where: { createdAt: { gte: date, lt: nextMonth } },
    });
    const lastMonth = await prisma.potensi.count({
      where: { createdAt: { gte: prevMonth, lte: endPrevMonth } },
    });
    let value = 0;
    if (lastMonth === 0 && thisMonth > 0) value = 100;
    else if (lastMonth === 0 && thisMonth === 0) value = 0;
    else value = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
    const label = date.toLocaleString("id-ID", {
      month: "short",
      year: "2-digit",
    });
    chartPertumbuhan.push({ label, value });
  }

  return (
    <div className="space-y-6 pt-14 lg:pt-0">
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
            <p className="text-xs text-muted-foreground">
              {lastWisata?.title && lastWisata?.createdAt
                ? `Terakhir: ${formatTanggalIndo(lastWisata.createdAt)}`
                : "Belum ada data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total UMKM</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUMKM}</div>
            <p className="text-xs text-muted-foreground">
              {lastUMKM?.title && lastUMKM?.createdAt
                ? `Terakhir: ${formatTanggalIndo(lastUMKM.createdAt)}`
                : "Belum ada data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budaya</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBudaya}</div>
            <p className="text-xs text-muted-foreground">
              {lastBudaya?.title && lastBudaya?.createdAt
                ? `Terakhir: ${formatTanggalIndo(lastBudaya.createdAt)}`
                : "Belum ada data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pertumbuhan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pertumbuhan}%</div>
            <p className="text-xs text-muted-foreground">
              Pertumbuhan potensi bulan ini
            </p>
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
              Total pengunjung bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesan Kontak</CardTitle>
            <Mail className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKontak}</div>
            <p className="text-xs text-muted-foreground">
              Total pesan masuk dari form kontak
            </p>
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
              {/* Pesan Kontak Terbaru */}
              {kontakTerbaru.map((k) => (
                <div key={k.id} className="flex items-center space-x-4">
                  <Mail className="w-4 h-4 text-blue-700" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Pesan Baru dari {k.nama}
                    </p>
                    <p className="text-xs text-gray-500">Subjek: {k.subjek}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTanggalIndo(k.createdAt)}
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
      {/* Chart Statistik */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartStatistik
          data={chartUMKM}
          title="Grafik UMKM 12 Bulan Terakhir"
          color="#22c55e"
        />
        <ChartStatistik
          data={chartWisata}
          title="Grafik Wisata 12 Bulan Terakhir"
          color="#2563eb"
        />
        <ChartStatistik
          data={chartBudaya}
          title="Grafik Budaya 12 Bulan Terakhir"
          color="#eab308"
        />
        <ChartStatistik
          data={chartVisitor}
          title="Grafik Pengunjung 12 Bulan Terakhir"
          color="#6366f1"
        />
        <ChartStatistik
          data={chartPertumbuhan}
          title="Grafik Pertumbuhan Potensi (%)"
          color="#16a34a"
          unit="%"
        />
      </div>
    </div>
  );
}
