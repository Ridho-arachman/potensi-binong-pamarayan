import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tentang Kami | Potensi Desa Binong",
  description:
    "Pelajari lebih lanjut tentang Desa Binong, Kecamatan Pamarayan, Serang, Banten. Sejarah, visi, misi, dan potensi desa kami.",
  keywords:
    "tentang Desa Binong, sejarah Desa Binong, visi misi Desa Binong, Pamarayan",
};

export default function TentangPage() {
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Tentang Desa Binong
          </h1>
          <p className="text-gray-600 text-lg">
            Mengenal lebih dekat potensi dan keunggulan Desa Binong, Kecamatan
            Pamarayan
          </p>
        </div>

        <div className="space-y-8">
          {/* Sejarah */}
          <Card>
            <CardHeader>
              <CardTitle>Sejarah Desa Binong</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Desa Binong adalah salah satu desa yang terletak di Kecamatan
                Pamarayan, Kabupaten Serang, Provinsi Banten. Desa ini memiliki
                sejarah panjang yang bermula dari zaman kolonial Belanda.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nama &quot;Binong&quot; berasal dari kata dalam bahasa Sunda
                yang berarti &quot;tempat yang tinggi&quot; atau &quot;bukit
                kecil&quot;. Hal ini sesuai dengan kondisi geografis desa yang
                berada di dataran tinggi dengan pemandangan yang indah.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sejak dahulu, Desa Binong dikenal sebagai desa yang subur dengan
                hasil pertanian yang melimpah. Masyarakat desa hidup rukun dan
                gotong royong dalam mengembangkan potensi desa.
              </p>
            </CardContent>
          </Card>

          {/* Visi & Misi */}
          <Card>
            <CardHeader>
              <CardTitle>Visi & Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Visi
                  </h3>
                  <p className="text-gray-700">
                    &quot;Terwujudnya Desa Binong yang mandiri, maju, dan
                    sejahtera melalui pengembangan potensi lokal yang
                    berkelanjutan&quot;
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Misi
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li>
                      Mengembangkan sektor pertanian dan peternakan yang modern
                    </li>
                    <li>
                      Meningkatkan kualitas pendidikan dan kesehatan masyarakat
                    </li>
                    <li>Mengembangkan potensi wisata alam dan budaya</li>
                    <li>Mendorong pertumbuhan UMKM dan ekonomi kreatif</li>
                    <li>Membangun infrastruktur desa yang memadai</li>
                    <li>
                      Meningkatkan partisipasi masyarakat dalam pembangunan
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geografis */}
          <Card>
            <CardHeader>
              <CardTitle>Kondisi Geografis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Letak Geografis
                  </h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Utara: Desa Pamarayan</li>
                    <li>• Selatan: Desa Cibojong</li>
                    <li>• Barat: Desa Cibuntu</li>
                    <li>• Timur: Desa Cibuntu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Luas Wilayah
                  </h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Total Luas: 2.500 Ha</li>
                    <li>• Sawah: 800 Ha</li>
                    <li>• Ladang: 1.200 Ha</li>
                    <li>• Pemukiman: 300 Ha</li>
                    <li>• Lainnya: 200 Ha</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demografis */}
          <Card>
            <CardHeader>
              <CardTitle>Data Demografis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2,500
                  </div>
                  <div className="text-gray-600">Jumlah Penduduk</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    650
                  </div>
                  <div className="text-gray-600">Jumlah KK</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    5
                  </div>
                  <div className="text-gray-600">Jumlah RT</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potensi Unggulan */}
          <Card>
            <CardHeader>
              <CardTitle>Potensi Unggulan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-3">🏞️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Wisata Alam
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sungai Ciujung, kebun buah, dan pemandangan alam yang indah
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-3">🏪</div>
                  <h3 className="font-semibold text-gray-900 mb-2">UMKM</h3>
                  <p className="text-gray-600 text-sm">
                    Kerajinan bambu, kuliner tradisional, dan usaha mikro
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-4xl mb-3">🎭</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Budaya</h3>
                  <p className="text-gray-600 text-sm">
                    Tari tradisional, adat istiadat, dan kesenian lokal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pemerintahan */}
          <Card>
            <CardHeader>
              <CardTitle>Struktur Pemerintahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Kepala Desa</span>
                  <span className="text-gray-600">Ahmad Supriadi, S.Pd</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Sekretaris Desa</span>
                  <span className="text-gray-600">Siti Nurhaliza, S.E</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Kasi Pemerintahan</span>
                  <span className="text-gray-600">Budi Santoso</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Kasi Kesejahteraan</span>
                  <span className="text-gray-600">Dewi Sartika</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Kasi Pelayanan</span>
                  <span className="text-gray-600">Rudi Hermawan</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Maps Lokasi Desa Binong */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 text-center">
            Lokasi Desa Binong
          </h2>
          <div className="rounded-xl overflow-hidden shadow border border-blue-100 mx-auto max-w-3xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31728.152321237776!2d106.2891902185314!3d-6.261221938529664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421b0e39cc6ec5%3A0x94740a34169522db!2sBinong%2C%20Kec.%20Pamarayan%2C%20Kabupaten%20Serang%2C%20Banten!5e0!3m2!1sid!2sid!4v1752479074554!5m2!1sid!2sid"
              style={{ width: "100%", border: 0 }}
              height={400}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Desa Binong di Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
