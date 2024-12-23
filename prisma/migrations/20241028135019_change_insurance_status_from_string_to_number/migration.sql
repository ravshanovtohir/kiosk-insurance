/*
  Warnings:

  - The `status` column on the `insurances` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "insurances" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "insurances_anketaId_status_polis_id_vendor_id_order_id_crea_idx" ON "insurances"("anketaId", "status", "polis_id", "vendor_id", "order_id", "created_at");
