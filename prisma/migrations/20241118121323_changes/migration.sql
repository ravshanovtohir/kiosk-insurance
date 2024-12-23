/*
  Warnings:

  - A unique constraint covering the columns `[user_id,id]` on the table `insurances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "insurances_user_id_id_key" ON "insurances"("user_id", "id");
