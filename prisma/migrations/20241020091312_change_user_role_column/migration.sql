/*
  Warnings:

  - Made the column `incasator_id` on table `deposits` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "deposits" ADD COLUMN     "amount" BIGINT DEFAULT 0,
ADD COLUMN     "bank_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cash_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "check_photo" TEXT,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "confirned_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "operator_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "source" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "incasator_id" SET NOT NULL,
ALTER COLUMN "incasator_id" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "insurances" ALTER COLUMN "create_res_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "UserRole";
