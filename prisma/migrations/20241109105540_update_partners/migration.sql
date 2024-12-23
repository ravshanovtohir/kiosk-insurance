-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "limited_amount_in_region" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "limited_amount_tashkent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unlimited_amount_in_region" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unlimited_amount_tashkent" INTEGER NOT NULL DEFAULT 0;
