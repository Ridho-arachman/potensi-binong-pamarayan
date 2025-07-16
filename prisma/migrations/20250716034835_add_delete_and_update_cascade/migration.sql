-- DropForeignKey
ALTER TABLE "PotensiImage" DROP CONSTRAINT "PotensiImage_potensiId_fkey";

-- AddForeignKey
ALTER TABLE "PotensiImage" ADD CONSTRAINT "PotensiImage_potensiId_fkey" FOREIGN KEY ("potensiId") REFERENCES "Potensi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
