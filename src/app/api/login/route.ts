import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      { error: "Email atau password salah." },
      { status: 401 }
    );
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch)
    return NextResponse.json(
      { error: "Email atau password salah." },
      { status: 401 }
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user;

  // Generate JWT tokens
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  // Set refresh token dan access token sebagai httpOnly cookie
  const response = NextResponse.json({
    ...userWithoutPassword,
    accessToken,
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15, // 15 menit
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
