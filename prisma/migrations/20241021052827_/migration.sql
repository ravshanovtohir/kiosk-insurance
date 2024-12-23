/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `user_balances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_balances_id_user_id_key" ON "user_balances"("id", "user_id");
