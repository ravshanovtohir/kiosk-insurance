/*
  Warnings:

  - Changed the type of `vendor_id` on the `insurances` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "insurances" DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "insurances_anketaId_status_polis_id_vendor_id_order_id_crea_idx" ON "insurances"("anketaId", "status", "polis_id", "vendor_id", "order_id", "created_at");
