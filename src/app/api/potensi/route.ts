import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.potensi.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const potensi = await prisma.potensi.create({
    data: {
      title: body.title,
      category: body.category,
      description: body.description,
      contact: body.contact,
      mainImage: body.mainImage,
    },
  });
  return NextResponse.json(potensi, { status: 201 });
}
