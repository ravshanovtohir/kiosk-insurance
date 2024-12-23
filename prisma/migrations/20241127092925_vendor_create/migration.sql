-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "start_number" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);
