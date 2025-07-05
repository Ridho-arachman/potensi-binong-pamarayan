import { Mail, Instagram, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function KontakPage() {
  return (
    <section className="container py-8 sm:py-12 md:py-14 flex flex-col items-center min-h-[70vh] px-4 sm:px-6">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-blue-900">
          Kontak & Sosial Media
        </h1>
        <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base">
          Hubungi kami untuk informasi lebih lanjut, kolaborasi, atau pertanyaan
          seputar potensi Desa Binong.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl mb-8 sm:mb-12">
        <Card className="shadow-md border-blue-100">
          <CardContent className="py-6 sm:py-8 px-4 sm:px-6">
            <h2 className="font-heading text-lg sm:text-xl font-semibold mb-4 text-blue-900">
              Info Kontak
            </h2>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-center gap-3 sm:gap-4">
                <Mail size={24} className="text-blue-700 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm text-slate-500">
                    Email
                  </span>
                  <a
                    href="mailto:binongdesa@gmail.com"
                    className="text-base sm:text-lg font-medium underline hover:text-blue-700 transition-colors"
                  >
                    binongdesa@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Instagram size={24} className="text-pink-600 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm text-slate-500">
                    Instagram
                  </span>
                  <a
                    href="https://instagram.com/binongdesa"
                    className="text-base sm:text-lg font-medium underline hover:text-pink-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    binongdesa
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <MapPin size={24} className="text-green-700 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm text-slate-500">
                    Alamat Kantor Desa
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    Jl. Raya Binong No. 1, Pamarayan, Serang, Banten
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Clock size={24} className="text-yellow-600 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm text-slate-500">
                    Jam Operasional
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    Senin - Jumat, 08.00 - 15.00 WIB
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-md border-blue-100">
          <CardContent className="py-6 sm:py-8 px-4 sm:px-6">
            <h2 className="font-heading text-lg sm:text-xl font-semibold mb-4 text-blue-900">
              Form Kontak
            </h2>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-1 font-medium text-blue-900 text-sm"
                >
                  Nama
                </label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Nama Anda"
                  className="focus-visible:ring-blue-400 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-blue-900 text-sm"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@domain.com"
                  className="focus-visible:ring-blue-400 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="block mb-1 font-medium text-blue-900 text-sm"
                >
                  Pesan
                </label>
                <Textarea
                  id="pesan"
                  name="pesan"
                  placeholder="Tulis pesan Anda di sini..."
                  className="focus-visible:ring-blue-400 min-h-[60px] sm:min-h-[80px] text-sm"
                />
              </div>
              <Button type="submit" className="w-full text-sm">
                Kirim Pesan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-4xl shadow-md border-blue-100 mb-8">
        <CardContent className="py-4 sm:py-6 px-4 sm:px-6">
          <h2 className="font-heading text-lg sm:text-xl font-semibold mb-4 text-blue-900">
            Lokasi Kantor Desa Binong
          </h2>
          <div className="w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden">
            <iframe
              title="Lokasi Kantor Desa Binong"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.434964295002!2d106.323456!3d-6.206789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4207e2b2e2b2b3%3A0x1234567890abcdef!2sDesa%20Binong%2C%20Pamarayan%2C%20Serang%2C%20Banten!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
