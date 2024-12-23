/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `user_balance_history` table. All the data in the column will be lost.
  - You are about to drop the `_UserBalanceHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `user_balance_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserBalanceHistory" DROP CONSTRAINT "_UserBalanceHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBalanceHistory" DROP CONSTRAINT "_UserBalanceHistory_B_fkey";

-- AlterTable
ALTER TABLE "user_balance_history" DROP COLUMN "transaction_id",
ADD COLUMN     "amount" BIGINT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_UserBalanceHistory";
