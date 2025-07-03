/*
  Warnings:

  - You are about to drop the `Umkm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UmkmImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Umkm" DROP CONSTRAINT "Umkm_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "UmkmImage" DROP CONSTRAINT "UmkmImage_umkmId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Umkm";

-- DropTable
DROP TABLE "UmkmImage";

-- CreateTable
CREATE TABLE "Potensi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact" TEXT,
    "mainImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Potensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotensiImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "potensiId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PotensiImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PotensiImage" ADD CONSTRAINT "PotensiImage_potensiId_fkey" FOREIGN KEY ("potensiId") REFERENCES "Potensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
