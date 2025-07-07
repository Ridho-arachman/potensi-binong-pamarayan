import { NextResponse } from "next/server";

export async function POST() {
  // Hapus cookie dengan set expires ke masa lalu
  const response = NextResponse.json({ message: "Logout berhasil" });
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
