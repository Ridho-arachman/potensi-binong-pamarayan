"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Leaf, Info, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Beranda", icon: <Home size={18} /> },
  { href: "/potensi", label: "Potensi", icon: <Leaf size={18} /> },
  { href: "/tentang", label: "Tentang", icon: <Info size={18} /> },
  { href: "/kontak", label: "Kontak", icon: <Mail size={18} /> },
  { href: "/ajukan", label: "Ajukan", icon: <Plus size={18} /> },
];

export default function Navbar() {
  return (
    <nav className={cn("w-full border-b bg-white sticky top-0 z-50")}>
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-bold text-lg">
          Potensi Desa Binong Pamarayan
        </Link>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className="flex items-center gap-1"
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
