import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, nomor, subjek, pesan } = body;

    if (!nama || !email || !nomor || !subjek || !pesan) {
      return NextResponse.json(
        { message: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    // Validasi nomor (maksimal 12 digit)
    if (nomor.length > 12) {
      return NextResponse.json(
        { message: "Nomor telepon maksimal 12 digit." },
        { status: 400 }
      );
    }

    // Validasi email unik
    const existing = await prisma.kontak.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email sudah pernah digunakan." },
        { status: 400 }
      );
    }

    const kontak = await prisma.kontak.create({
      data: { nama, email, nomor, subjek, pesan },
    });
    return NextResponse.json({ message: "Pesan berhasil dikirim.", kontak });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await prisma.kontak.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { message: "Gagal mengambil data kontak." },
      { status: 500 }
    );
  }
}
