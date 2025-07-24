import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { potensiSchema } from "@/lib/zod";

// GET /api/potensi/[id]
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id)
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  const potensi = await prisma.potensi.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!potensi)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(potensi);
}

// PATCH /api/potensi/[id]
export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id)
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  const form = await req.formData();
  const title = form.get("title") as string;
  const category = form.get("category") as string;
  const description = form.get("description") as string;
  const contact = form.get("contact") as string;
  const files = form.getAll("images") as File[];
  const existingImageIds = JSON.parse(
    (form.get("existingImageIds") as string) || "[]"
  );

  const result = potensiSchema.safeParse({
    title,
    category,
    description,
    contact,
  });
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0]?.message || "Data tidak valid." },
      { status: 400 }
    );
  }

  const old = await prisma.potensi.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const toDelete = old.images.filter(
    (img) => !existingImageIds.includes(img.id)
  );
  for (const img of toDelete) {
    const fileName = img.url.split("/").pop()!;
    await supabase.storage.from("potensi-images").remove([fileName]);
    await prisma.potensiImage.delete({ where: { id: img.id } });
  }

  const imageUrls: string[] = [];
  for (const file of files) {
    if (!file || typeof file === "string") continue;
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const uploadResult = await supabase.storage
      .from("potensi-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadResult.error) {
      return NextResponse.json(
        { error: "Gagal upload gambar", detail: uploadResult.error.message },
        { status: 500 }
      );
    }
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/potensi-images/${fileName}`;
    imageUrls.push(imageUrl);
  }

  const potensi = await prisma.potensi.update({
    where: { id },
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

// DELETE /api/potensi/[id]
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id)
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  try {
    const potensi = await prisma.potensi.findUnique({
      where: { id },
      include: { images: true },
    });

    if (potensi) {
      for (const img of potensi.images) {
        const fileName = img.url.split("/").pop()!;
        await supabase.storage.from("potensi-images").remove([fileName]);
      }
    }

    await prisma.potensi.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
