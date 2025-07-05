import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Playfair_Display } from "next/font/google";

export const metadata: Metadata = {
  title: {
    default: "Potensi Desa Binong | Wisata, UMKM & Budaya Pamarayan",
    template: "%s | Potensi Desa Binong",
  },
  description:
    "Website resmi Potensi Desa Binong, Kecamatan Pamarayan, Serang, Banten. Temukan wisata alam, UMKM kreatif, dan budaya lokal yang menarik.",
  keywords:
    "Desa Binong, Pamarayan, wisata desa, UMKM, budaya lokal, Serang Banten, potensi desa, Sungai Ciujung",
  authors: [{ name: "Desa Binong" }],
  creator: "Desa Binong",
  publisher: "Desa Binong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://potensi-desa-binong.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://potensi-desa-binong.vercel.app",
    title: "Potensi Desa Binong",
    description:
      "Temukan wisata alam, UMKM kreatif, dan budaya lokal Desa Binong, Pamarayan, Serang, Banten.",
    siteName: "Potensi Desa Binong",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Potensi Desa Binong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Potensi Desa Binong",
    description:
      "Temukan wisata alam, UMKM kreatif, dan budaya lokal Desa Binong, Pamarayan, Serang, Banten.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
