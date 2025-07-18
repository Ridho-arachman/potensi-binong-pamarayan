import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as {
        userId: string;
      };
    } catch {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }
    const { id, name, email, role, createdAt, updatedAt } = user;
    return NextResponse.json({ id, name, email, role, createdAt, updatedAt });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Ambil accessToken dari cookie
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as {
        userId: string;
      };
    } catch {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }
    const userId = payload.userId;
    const { name, email, password } = await req.json();
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }
    // Cek email unik (kecuali email sendiri)
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== userId) {
      return NextResponse.json(
        { error: "Email sudah digunakan." },
        { status: 400 }
      );
    }
    const data: { name: string; email: string; password?: string } = {
      name,
      email,
    };
    if (password && password.length > 0) {
      data.password = await hashPassword(password);
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
