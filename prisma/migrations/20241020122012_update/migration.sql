/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `user_balance_history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_balance_history_id_userId_key" ON "user_balance_history"("id", "userId");
