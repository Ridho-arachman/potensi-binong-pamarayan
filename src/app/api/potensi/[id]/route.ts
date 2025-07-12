import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const potensi = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });
  if (!potensi)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(potensi);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const form = await req.formData();
  const title = form.get("title") as string;
  const category = form.get("category") as string;
  const description = form.get("description") as string;
  const contact = form.get("contact") as string;
  const location = form.get("location") as string;
  const files = form.getAll("images") as File[];
  const existingImageIds = JSON.parse(
    (form.get("existingImageIds") as string) || "[]"
  );

  // Ambil data lama
  const old = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });
  if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Hapus gambar yang tidak ada di existingImageIds
  const toDelete = old.images.filter(
    (img) => !existingImageIds.includes(img.id)
  );
  for (const img of toDelete) {
    const filePath = path.join(
      process.cwd(),
      "public",
      img.url.replace("/uploads", "uploads")
    );
    try {
      await unlink(filePath);
    } catch {}
    await prisma.potensiImage.delete({ where: { id: img.id } });
  }

  // Upload gambar baru
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
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

  // Update potensi
  const potensi = await prisma.potensi.update({
    where: { id: params.id },
    data: {
      title,
      category,
      description,
      contact,
      mainImage:
        existingImageIds.length > 0
          ? old.images.find((img) => img.id === existingImageIds[0])?.url ||
            imageUrls[0] ||
            null
          : imageUrls[0] || null,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json(potensi);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Hapus gambar dari storage
  const potensi = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });
  if (potensi) {
    for (const img of potensi.images) {
      const filePath = path.join(
        process.cwd(),
        "public",
        img.url.replace("/uploads", "uploads")
      );
      try {
        await unlink(filePath);
      } catch {}
    }
  }
  await prisma.potensi.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
