import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import { kontakSchema } from "@/lib/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = kontakSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0]?.message || "Data tidak valid." },
        { status: 400 }
      );
    }
    const { nama, email, nomor, subjek, pesan } = result.data;

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nama = searchParams.get("nama") || undefined;
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;

    const where: Prisma.KontakWhereInput = {};
    if (nama) {
      where.nama = { contains: nama, mode: "insensitive" };
    }
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    const data = await prisma.kontak.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { message: "Gagal mengambil data kontak." },
      { status: 500 }
    );
  }
}
