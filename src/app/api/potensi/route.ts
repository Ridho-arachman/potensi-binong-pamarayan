import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { potensiSchema } from "@/lib/zod";

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

  // Upload file gambar ke Supabase Storage
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
