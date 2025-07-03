/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Umkm` table. All the data in the column will be lost.
  - Added the required column `address` to the `Umkm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Umkm" DROP COLUMN "imageUrl",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UmkmImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "umkmId" TEXT NOT NULL,

    CONSTRAINT "UmkmImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UmkmImage" ADD CONSTRAINT "UmkmImage_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "Umkm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
