-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('operator', 'incasator', 'accountant');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "cash_count" INTEGER NOT NULL DEFAULT 0,
    "latitude" DECIMAL(8,6) NOT NULL DEFAULT 0.0,
    "longitude" DECIMAL(9,6) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "structure_id" INTEGER,
    "incasator_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurances" (
    "id" SERIAL NOT NULL,
    "anketaId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "create_res_id" INTEGER NOT NULL,
    "polis_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "request" JSONB,
    "response" JSONB,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER,
    "service_id" INTEGER,

    CONSTRAINT "insurances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balances" (
    "id" SERIAL NOT NULL,
    "balance" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "last_id" INTEGER NOT NULL,

    CONSTRAINT "user_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DECIMAL(7,2) NOT NULL DEFAULT 0.0,
    "region_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" SERIAL NOT NULL,
    "incasator_id" INTEGER,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "insurance_id" INTEGER,
    "vendor_id" INTEGER,
    "anketa_id" INTEGER,
    "account" TEXT,
    "amount" BIGINT DEFAULT 0,
    "structure_id" INTEGER,
    "region_id" INTEGER,
    "request" JSONB,
    "response" JSONB,
    "payerPhone" TEXT,
    "merchantId" TEXT,
    "terminalId" TEXT,
    "partner_transaction_id" TEXT,
    "bank_transaction_id" TEXT,
    "status" INTEGER DEFAULT 0,
    "smsNotify" INTEGER DEFAULT 0,
    "paymentType" INTEGER DEFAULT 0,
    "currency" TEXT,
    "paymentId" INTEGER DEFAULT 0,
    "partnerId" INTEGER DEFAULT 0,
    "chequeDetails" TEXT,
    "cardNumber" TEXT,
    "cardExpire" TEXT,
    "retry" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balance_history" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "user_balance_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserBalanceHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "users_code_status_cash_count_latitude_longitude_structure_i_idx" ON "users"("code", "status", "cash_count", "latitude", "longitude", "structure_id", "incasator_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_email_key" ON "users"("code", "email");

-- CreateIndex
CREATE INDEX "insurances_anketaId_status_polis_id_vendor_id_order_id_crea_idx" ON "insurances"("anketaId", "status", "polis_id", "vendor_id", "order_id", "created_at");

-- CreateIndex
CREATE INDEX "user_balances_balance_user_id_created_at_idx" ON "user_balances"("balance", "user_id", "created_at");

-- CreateIndex
CREATE INDEX "structures_name_status_created_at_idx" ON "structures"("name", "status", "created_at");

-- CreateIndex
CREATE INDEX "transactions_user_id_vendor_id_partner_transaction_id_accou_idx" ON "transactions"("user_id", "vendor_id", "partner_transaction_id", "account", "status", "paymentId", "partnerId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBalanceHistory_AB_unique" ON "_UserBalanceHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBalanceHistory_B_index" ON "_UserBalanceHistory"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurances" ADD CONSTRAINT "insurances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balances" ADD CONSTRAINT "user_balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_insurance_id_fkey" FOREIGN KEY ("insurance_id") REFERENCES "insurances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "user_balance_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;
