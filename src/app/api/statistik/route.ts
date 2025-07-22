import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || undefined;
  const now = new Date();
  const data: { label: string; value: number }[] = [];

  if (["umkm", "wisata", "budaya", "visitor"].includes(type || "")) {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      let value = 0;
      if (type === "visitor") {
        value = await prisma.visitor.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        });
      } else if (type) {
        value = await prisma.potensi.count({
          where: {
            category: type as string,
            createdAt: {
              gte: date,
              lt: nextMonth,
            },
          },
        });
      }
      const label = date.toLocaleString("id-ID", {
        month: "short",
        year: "2-digit",
      });
      data.push({ label, value });
    }
  } else if (type === "pertumbuhan") {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const endPrevMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0,
        23,
        59,
        59,
        999
      );
      const thisMonth = await prisma.potensi.count({
        where: { createdAt: { gte: date, lt: nextMonth } },
      });
      const lastMonth = await prisma.potensi.count({
        where: { createdAt: { gte: prevMonth, lte: endPrevMonth } },
      });
      let value = 0;
      if (lastMonth === 0 && thisMonth > 0) value = 100;
      else if (lastMonth === 0 && thisMonth === 0) value = 0;
      else value = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
      const label = date.toLocaleString("id-ID", {
        month: "short",
        year: "2-digit",
      });
      data.push({ label, value });
    }
  }

  return NextResponse.json({ data });
}
