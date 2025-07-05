"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">
          Kelola pengaturan website dan akun admin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pengaturan Website */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nama Website</Label>
              <Input id="siteName" defaultValue="Potensi Desa Binong" />
            </div>
            <div>
              <Label htmlFor="siteDescription">Deskripsi Website</Label>
              <Input
                id="siteDescription"
                defaultValue="Website resmi potensi Desa Binong, Pamarayan"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Kontak</Label>
              <Input id="contactEmail" defaultValue="info@desabinong.id" />
            </div>
            <div>
              <Label htmlFor="contactPhone">Telepon Kontak</Label>
              <Input id="contactPhone" defaultValue="+62 254 123456" />
            </div>
            <Button className="w-full">Simpan Pengaturan</Button>
          </CardContent>
        </Card>

        {/* Pengaturan Akun */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="admin" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="admin@desabinong.id" />
            </div>
            <div>
              <Label htmlFor="newPassword">Password Baru</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Masukkan password baru"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Konfirmasi password baru"
              />
            </div>
            <Button className="w-full">Update Akun</Button>
          </CardContent>
        </Card>
      </div>

      {/* Pengaturan Notifikasi */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Notifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotif">Notifikasi Email</Label>
              <p className="text-sm text-gray-500">
                Terima notifikasi via email untuk pengajuan baru
              </p>
            </div>
            <Switch id="emailNotif" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="approvalNotif">Notifikasi Persetujuan</Label>
              <p className="text-sm text-gray-500">
                Terima notifikasi saat ada potensi yang disetujui
              </p>
            </div>
            <Switch id="approvalNotif" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weeklyReport">Laporan Mingguan</Label>
              <p className="text-sm text-gray-500">
                Kirim laporan mingguan via email
              </p>
            </div>
            <Switch id="weeklyReport" />
          </div>
        </CardContent>
      </Card>

      {/* Pengaturan Keamanan */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Keamanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactor">Autentikasi 2 Faktor</Label>
              <p className="text-sm text-gray-500">
                Aktifkan verifikasi 2 langkah untuk keamanan tambahan
              </p>
            </div>
            <Switch id="twoFactor" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sessionTimeout">Timeout Sesi</Label>
              <p className="text-sm text-gray-500">
                Otomatis logout setelah 30 menit tidak aktif
              </p>
            </div>
            <Switch id="sessionTimeout" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="loginHistory">Riwayat Login</Label>
              <p className="text-sm text-gray-500">
                Catat riwayat login untuk monitoring keamanan
              </p>
            </div>
            <Switch id="loginHistory" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
