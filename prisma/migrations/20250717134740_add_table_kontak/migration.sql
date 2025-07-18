-- CreateTable
CREATE TABLE "Kontak" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nomor" VARCHAR(12) NOT NULL,
    "subjek" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,

    CONSTRAINT "Kontak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kontak_email_key" ON "Kontak"("email");
