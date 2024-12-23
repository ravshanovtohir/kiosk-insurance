/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_balance_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user_balances` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_balance_history_id_userId_key";

-- DropIndex
DROP INDEX "user_balances_id_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_balance_history_userId_key" ON "user_balance_history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_balances_user_id_key" ON "user_balances"("user_id");
