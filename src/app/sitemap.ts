import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const baseUrl = "https://web-potensi-desa-binong-pamarayan.vercel.app";

  // Ambil semua id potensi dari database
  const potensi = await prisma.potensi.findMany({ select: { id: true } });

  const staticUrls = ["", "/potensi", "/tentang", "/kontak"];

  const dynamicUrls = potensi.map((p) => `/potensi/${p.id}`);

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
