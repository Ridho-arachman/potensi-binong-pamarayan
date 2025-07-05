"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AjukanPotensiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ajukan Potensi</h1>
        <p className="text-gray-600">Ajukan potensi baru untuk Desa Binong</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Pengajuan Potensi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Judul Potensi</Label>
                <Input id="title" placeholder="Masukkan judul potensi" />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wisata">Wisata Alam</SelectItem>
                    <SelectItem value="umkm">UMKM</SelectItem>
                    <SelectItem value="budaya">Budaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Jelaskan detail potensi..."
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact">Kontak</Label>
                <Input id="contact" placeholder="Nomor telepon atau email" />
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" placeholder="Alamat atau lokasi" />
              </div>
            </div>

            <div>
              <Label htmlFor="images">Upload Gambar</Label>
              <Input id="images" type="file" multiple accept="image/*" />
              <p className="text-sm text-gray-500 mt-1">
                Upload gambar potensi (maksimal 5 file)
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Batal
              </Button>
              <Button type="submit">Ajukan Potensi</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
