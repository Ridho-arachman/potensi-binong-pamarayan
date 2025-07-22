"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAdminSchema } from "@/lib/zod";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const values = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    // Validasi Zod
    const result = loginAdminSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Data tidak valid.");
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    });
    if (!res.ok) {
      setError("Email atau password salah.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">
            Masuk ke panel administrasi Desa Binong
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-gray-600 text-center">
              Halaman ini hanya untuk admin Desa Binong. Silakan login
              menggunakan akun admin yang valid. Pastikan password Anda aman dan
              jangan bagikan kredensial ke siapapun.
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Masukkan email"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Masukkan password"
                    className="w-full border rounded px-3 py-2 pr-12"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    aria-label={
                      showPassword ? "Sembunyikan password" : "Lihat password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575m2.122-2.122A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.402 3.22-1.125 4.575m-2.122 2.122A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.64 1.624-1.09 2.354M15.54 15.54A9.956 9.956 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Masuk
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
