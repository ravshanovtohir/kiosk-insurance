/*
  Warnings:

  - The `partner_transaction_id` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "partner_transaction_id",
ADD COLUMN     "partner_transaction_id" INTEGER;

-- CreateIndex
CREATE INDEX "transactions_user_id_vendor_id_partner_transaction_id_accou_idx" ON "transactions"("user_id", "vendor_id", "partner_transaction_id", "account", "status", "paymentId", "partnerId", "createdAt");
