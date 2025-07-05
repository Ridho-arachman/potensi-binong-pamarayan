"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Leaf, Info, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Beranda", icon: <Home size={18} /> },
  { href: "/potensi", label: "Potensi", icon: <Leaf size={18} /> },
  { href: "/tentang", label: "Tentang", icon: <Info size={18} /> },
  { href: "/kontak", label: "Kontak", icon: <Mail size={18} /> },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={cn("w-full border-b bg-white sticky top-0 z-50")}>
      <div className="container flex items-center justify-between py-3 px-4 sm:px-6">
        <Link href="/" className="font-bold text-lg sm:text-xl">
          Desa Binong
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container px-4 py-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className="w-full justify-start flex items-center gap-2 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
