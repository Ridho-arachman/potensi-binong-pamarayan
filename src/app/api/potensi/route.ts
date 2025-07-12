import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const data = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const title = form.get("title") as string;
  const category = form.get("category") as string;
  const description = form.get("description") as string;
  const contact = form.get("contact") as string;
  const files = form.getAll("images") as File[];

  // Pastikan folder uploads ada
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Simpan file gambar ke public/uploads
  const imageUrls: string[] = [];
  for (const file of files) {
    if (!file || typeof file === "string") continue;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    imageUrls.push(`/uploads/${filename}`);
  }

  // Buat Potensi dan relasi gambar
  const potensi = await prisma.potensi.create({
    data: {
      title,
      category,
      description,
      contact,
      mainImage: imageUrls[0] || null,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
    },
    include: { images: true },
  });

  return NextResponse.json(potensi, { status: 201 });
}
