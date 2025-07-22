// scripts/create-admin.ts
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { registerAdminSchema } from "@/lib/zod";

// Ganti nilai input admin di sini
const inputData = {
  name: "Admin Binong",
  email: "admin@example.com",
  password: "admin123", // < 8 karakter akan error
};

async function main() {
  // Validasi input menggunakan Zod
  const parsed = registerAdminSchema.safeParse(inputData);
  if (!parsed.success) {
    console.error("❌ Validasi gagal:");
    parsed.error.issues.forEach((issue) =>
      console.error(`- ${issue.path.join(".")}: ${issue.message}`)
    );
    return;
  }

  const { name, email, password } = parsed.data;

  // Cek apakah admin dengan email yang sama sudah ada
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("❌ Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan admin ke database
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN", // Pastikan enum Role dan kolom role ada
    },
  });

  console.log("✅ Admin created successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
