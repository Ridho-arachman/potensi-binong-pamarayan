import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const kontakSchema = z.object({
  nama: z.string().min(2, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  nomor: z
    .string()
    .min(8, "Nomor wajib diisi")
    .max(12, "Nomor maksimal 12 digit"),
  subjek: z.string().min(2, "Subjek wajib diisi"),
  pesan: z.string().min(5, "Pesan wajib diisi"),
});

export const potensiSchema = z.object({
  title: z.string().min(3, "Judul wajib diisi"),
  category: z.enum(["wisata", "umkm", "budaya"], {
    message: "Kategori wajib dipilih",
  }),
  description: z.string().min(10, "Deskripsi wajib diisi"),
  contact: z.string().min(8, "Kontak wajib diisi"),
  // images: validasi file dihandle manual di client/server
});

export const profileSchema = z
  .object({
    name: z.string().min(2, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    newPassword: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Konfirmasi password tidak cocok!",
      path: ["confirmPassword"],
    }
  );

export const loginAdminSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerAdminSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});
