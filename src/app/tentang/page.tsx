import Image from "next/image";
import { Users, Store, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Desa Binong | Sejarah, Wisata & UMKM Pamarayan",
  description:
    "Pelajari sejarah, potensi wisata, dan UMKM Desa Binong, Kecamatan Pamarayan, Serang, Banten. Temukan keunikan budaya dan peluang investasi di desa kami.",
  keywords:
    "sejarah Desa Binong, wisata Pamarayan, UMKM desa, budaya lokal, Sungai Ciujung, investasi desa, Serang Banten",
  openGraph: {
    title: "Tentang Desa Binong",
    description:
      "Pelajari sejarah, potensi wisata, dan UMKM Desa Binong, Pamarayan, Serang, Banten.",
    type: "website",
    locale: "id_ID",
  },
};

export default function TentangPage() {
  return (
    <section className="container py-8 sm:py-12 md:py-14 flex flex-col items-center min-h-[70vh] px-4 sm:px-6">
      {/* Hero & Narasi */}
      <div className="mb-12 sm:mb-16 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-blue-900 drop-shadow-sm">
          Tentang Desa Binong
        </h1>
        <p className="font-body text-slate-700 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg mb-4">
          Selamat datang di{" "}
          <span className="font-semibold text-blue-800">Desa Binong</span>,
          Kecamatan Pamarayan, Serang, Banten. Desa kami kaya akan keindahan
          alam, budaya, dan semangat warganya. Temukan kisah, potensi, dan
          keunikan Binong yang siap menyambut Anda.
        </p>
        <blockquote className="italic text-blue-700 bg-blue-50 rounded-lg px-4 sm:px-6 py-3 max-w-xl mx-auto shadow mb-2 animate-fade-in text-sm sm:text-base">
          &quot;Bersama, kita majukan desa dengan inovasi dan gotong
          royong.&quot;
        </blockquote>
      </div>

      {/* Section Statistik */}
      <div className="w-full max-w-4xl mb-12 sm:mb-16">
        <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-blue-900">
          Statistik Desa Binong
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Users className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
              2,500+
            </div>
            <div className="text-slate-600 font-medium text-sm sm:text-base">
              Jumlah Warga
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <Store className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-green-900 mb-1">
              25+
            </div>
            <div className="text-slate-600 font-medium text-sm sm:text-base">
              Potensi UMKM
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-purple-900 mb-1">
              8+
            </div>
            <div className="text-slate-600 font-medium text-sm sm:text-base">
              Potensi Wisata
            </div>
          </div>
        </div>
      </div>

      {/* Section Sejarah Desa (Alternating) */}
      <section className="group w-full max-w-5xl mb-12 sm:mb-16 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 bg-slate-50 rounded-xl p-6 sm:p-8 shadow animate-fade-in">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
            Sejarah Singkat Desa Binong
          </h2>
          <p className="font-body mb-2 text-sm sm:text-base">
            Desa Binong telah ada sejak masa kolonial, tumbuh sebagai pusat
            pertanian dan perdagangan lokal. Sungai Ciujung menjadi urat nadi
            kehidupan, mengalirkan air, cerita, dan tradisi dari generasi ke
            generasi.
          </p>
          <p className="font-body text-sm sm:text-base">
            Kini, Binong berkembang modern tanpa melupakan akar budaya dan
            gotong royong yang menjadi identitas desa.
          </p>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
          <Image
            src="/globe.svg"
            width={280}
            height={180}
            alt="Ilustrasi Sungai dan Desa Binong"
            className="rounded-lg shadow-lg bg-white p-4 animate-fade-in transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </section>

      {/* Section Potensi Wisata (Alternating) */}
      <section className="group w-full max-w-5xl mb-12 sm:mb-16 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 sm:p-8 shadow animate-fade-in">
        <div className="lg:w-1/2 flex justify-center mb-4 lg:mb-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            width={280}
            height={180}
            alt="Wisata Sungai Ciujung Binong"
            className="rounded-lg shadow-lg object-cover animate-fade-in transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
            Potensi Wisata Desa Binong
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 font-body text-sm sm:text-base">
            <li>
              <b>Wisata Sungai Ciujung</b> – Pemandangan asri, spot memancing,
              wisata perahu tradisional.
            </li>
            <li>
              <b>Agrowisata & Sawah</b> – Rasakan suasana pedesaan, belajar
              bertani, nikmati hasil bumi lokal.
            </li>
            <li>
              <b>Wisata Religi & Budaya</b> – Situs bersejarah, tradisi sedekah
              bumi, festival desa.
            </li>
            <li>
              <b>Kuliner Khas</b> – Nasi liwet, kue cucur, jajanan pasar yang
              menggugah selera.
            </li>
          </ul>
        </div>
      </section>

      {/* Section Potensi UMKM (Alternating) */}
      <section className="group w-full max-w-5xl mb-12 sm:mb-16 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 bg-slate-50 rounded-xl p-6 sm:p-8 shadow animate-fade-in">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
            Potensi UMKM & Ekonomi Kreatif
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 font-body text-sm sm:text-base">
            <li>
              <b>Kerajinan Anyaman Bambu</b> – Produk kerajinan tangan yang
              sudah dipasarkan ke luar daerah.
            </li>
            <li>
              <b>Olahan Pangan Lokal</b> – Keripik singkong, emping melinjo,
              dodol khas desa.
            </li>
            <li>
              <b>Konveksi & Bordir</b> – Produksi pakaian, seragam, dan bordir
              khas Binong.
            </li>
            <li>
              <b>Jasa & Layanan</b> – Jasa pertanian, transportasi lokal,
              layanan digital kreatif.
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
            width={280}
            height={180}
            alt="Kerajinan UMKM Desa Binong"
            className="rounded-lg shadow-lg object-cover animate-fade-in transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </section>

      {/* Section Tujuan & Nilai */}
      <section className="w-full max-w-2xl mb-8 sm:mb-14">
        <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-900">
          Tujuan & Nilai Desa Binong
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 font-body text-sm sm:text-base">
          <li>Meningkatkan promosi potensi desa secara digital</li>
          <li>Memudahkan masyarakat dan investor mengenal potensi lokal</li>
          <li>Mendukung pengembangan ekonomi, wisata, dan budaya desa</li>
          <li>Transparansi, kolaborasi, inovasi, dan pelayanan inklusif</li>
        </ul>
      </section>
    </section>
  );
}
