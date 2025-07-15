"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Leaf, Info, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Beranda", icon: <Home size={18} /> },
  { href: "/potensi", label: "Potensi", icon: <Leaf size={18} /> },
  { href: "/tentang", label: "Tentang", icon: <Info size={18} /> },
  { href: "/kontak", label: "Kontak", icon: <Mail size={18} /> },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={cn("w-full border-b bg-white sticky top-0 z-50")}>
      <div className="container flex items-center justify-between py-3 px-4 sm:px-6">
        <Link href="/" className="font-bold text-lg sm:text-xl">
          Desa Binong
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className={cn(
                  "flex items-center gap-1",
                  isActive &&
                    "text-blue-700 font-bold bg-blue-50 hover:bg-blue-100"
                )}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            );
          })}
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
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start flex items-center gap-2 py-3",
                    isActive &&
                      "text-blue-700 font-bold bg-blue-50 hover:bg-blue-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
