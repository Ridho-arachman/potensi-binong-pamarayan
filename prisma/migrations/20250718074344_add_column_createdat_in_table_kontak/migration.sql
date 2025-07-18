-- AlterTable
ALTER TABLE "Kontak" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Kontak_nama_idx" ON "Kontak"("nama");
