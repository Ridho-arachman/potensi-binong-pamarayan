import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-6 text-gray-600">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
