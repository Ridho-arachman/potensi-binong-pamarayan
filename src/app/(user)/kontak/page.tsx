import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Kontak Kami | Potensi Desa Binong",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang potensi Desa Binong, Pamarayan. Kami siap membantu Anda.",
  keywords: "kontak Desa Binong, informasi Desa Binong, Pamarayan",
};

export default function KontakPage() {
  return (
    <section className="container py-10 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 tracking-tight drop-shadow-sm">
            Hubungi Kami
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Kami siap membantu Anda terkait informasi, layanan, dan potensi Desa
            Binong. Silakan hubungi kami melalui form atau kontak di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Form Kontak */}
          <Card className="h-full flex flex-col justify-between shadow-md border-blue-100 p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800">
                Kirim Pesan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col">
                    <Label htmlFor="nama" className="mb-1">
                      Nama Lengkap
                    </Label>
                    <Input id="nama" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="email" className="mb-1">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contoh@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <Label htmlFor="telepon" className="mb-1">
                      Nomor Telepon
                    </Label>
                    <Input id="telepon" placeholder="08123456789" />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="subjek" className="mb-1">
                      Subjek
                    </Label>
                    <Input id="subjek" placeholder="Subjek pesan" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="pesan" className="mb-1">
                    Pesan
                  </Label>
                  <Textarea
                    id="pesan"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    className="px-10 py-2 text-base font-semibold bg-blue-800 hover:bg-blue-900 text-white shadow"
                  >
                    Kirim Pesan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Informasi Kontak */}
          <Card className="h-full flex flex-col justify-between shadow border-blue-100 p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800">
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-base">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Alamat Kantor Desa
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Desa Binong, Kecamatan Pamarayan
                  <br />
                  Kabupaten Serang, Banten 42176
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
                <p className="text-gray-700">+62 254 123456</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-700">info@desabinong.id</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline font-medium"
                >
                  Chat Admin Desa
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Jam Operasional
                </h3>
                <p className="text-gray-700">
                  Senin - Jumat: 08:00 - 16:00
                  <br />
                  Sabtu: 08:00 - 12:00
                  <br />
                  Minggu: Tutup
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Accordion di bawah form & info kontak */}
        <div className="mt-10">
          <Card className="shadow border-blue-100 p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800">
                FAQ (Tanya Jawab)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-medium text-blue-900">
                    Bagaimana cara mengajukan pertanyaan atau permohonan layanan
                    desa?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Anda dapat mengisi form kontak di samping atau langsung
                    menghubungi admin desa melalui WhatsApp yang tersedia di
                    atas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-medium text-blue-900">
                    Apakah bisa mendaftar UMKM atau potensi desa secara online?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Ya, silakan gunakan menu pendaftaran di website atau hubungi
                    admin desa untuk panduan lebih lanjut.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
