import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { potensiSchema } from "@/lib/zod";

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
  const files = form.getAll("images") as File[];
  const existingImageIds = JSON.parse(
    (form.get("existingImageIds") as string) || "[]"
  );

  // Validasi Zod
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

  // Ambil data lama
  const old = await prisma.potensi.findUnique({
    where: { id: params.id },
    include: { images: true },
  });
  if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Hapus gambar yang tidak ada di existingImageIds dari Supabase Storage dan database
  const toDelete = old.images.filter(
    (img) => !existingImageIds.includes(img.id)
  );
  for (const img of toDelete) {
    // Hapus dari Supabase Storage
    const urlParts = img.url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    await supabase.storage.from("potensi-images").remove([fileName]);
    await prisma.potensiImage.delete({ where: { id: img.id } });
  }

  // Upload gambar baru ke Supabase Storage
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
        {
          error: "Gagal upload gambar ke storage",
          detail: uploadResult.error.message,
        },
        { status: 500 }
      );
    }
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/potensi-images/${fileName}`;
    imageUrls.push(imageUrl);
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
  try {
    // Hapus gambar dari Supabase Storage dan database
    const potensi = await prisma.potensi.findUnique({
      where: { id: params.id },
      include: { images: true },
    });
    if (potensi) {
      for (const img of potensi.images) {
        // Hapus dari Supabase Storage
        const urlParts = img.url.split("/");
        const fileName = urlParts[urlParts.length - 1];
        await supabase.storage.from("potensi-images").remove([fileName]);
      }
    }
    await prisma.potensi.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saat menghapus potensi:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
