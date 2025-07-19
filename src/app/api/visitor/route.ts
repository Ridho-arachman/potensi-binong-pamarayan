import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    const ipAddress = req.headers.get("x-forwarded-for") || null;
    const userAgent = req.headers.get("user-agent") || null;
    const visitor = await prisma.visitor.create({
      data: {
        ipAddress,
        userAgent,
        page,
      },
    });
    return NextResponse.json({ success: true, visitor });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mencatat visitor" },
      { status: 500 }
    );
  }
}
