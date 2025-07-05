import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami | Potensi Desa Binong",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang potensi Desa Binong, Pamarayan. Kami siap membantu Anda.",
  keywords: "kontak Desa Binong, informasi Desa Binong, Pamarayan",
};

export default function KontakPage() {
  return (
    <section className="container py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 text-lg">
            Ada pertanyaan tentang potensi Desa Binong? Kami siap membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Kontak */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contoh@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input id="telepon" placeholder="08123456789" />
                </div>
                <div>
                  <Label htmlFor="subjek">Subjek</Label>
                  <Input id="subjek" placeholder="Subjek pesan" />
                </div>
                <div>
                  <Label htmlFor="pesan">Pesan</Label>
                  <Textarea
                    id="pesan"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informasi Kontak */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Alamat</h3>
                  <p className="text-gray-600">
                    Desa Binong, Kecamatan Pamarayan
                    <br />
                    Kabupaten Serang, Banten 42176
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telepon</h3>
                  <p className="text-gray-600">+62 254 123456</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@desabinong.id</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Jam Operasional
                  </h3>
                  <p className="text-gray-600">
                    Senin - Jumat: 08:00 - 16:00
                    <br />
                    Sabtu: 08:00 - 12:00
                    <br />
                    Minggu: Tutup
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📘 Facebook - Desa Binong
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📷 Instagram - @desabinong
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🐦 Twitter - @desabinong
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📺 YouTube - Desa Binong Channel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
