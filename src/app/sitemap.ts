import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const baseUrl = "https://web-potensi-desa-binong-pamarayan.vercel.app";
  const now = new Date().toISOString();

  // Ambil semua id potensi dari database
  const potensi = await prisma.potensi.findMany({
    select: { id: true, updatedAt: true },
  });

  // Daftar URL statis beserta properti sitemap
  const staticUrls = [
    {
      loc: "",
      lastmod: now,
      changefreq: "yearly",
      priority: 1,
    },
    {
      loc: "/potensi",
      lastmod: now,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/tentang",
      lastmod: now,
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      loc: "/kontak",
      lastmod: now,
      changefreq: "monthly",
      priority: 0.7,
    },
  ];

  // URL dinamis potensi
  const dynamicUrls = potensi.map((p) => ({
    loc: `/potensi/${p.id}`,
    lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString() : now,
    changefreq: "weekly",
    priority: 0.5,
  }));

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${baseUrl}${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
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
