-- DropIndex
DROP INDEX "users_code_status_cash_count_latitude_longitude_structure_i_idx";

-- CreateIndex
CREATE INDEX "users_code_status_cash_count_latitude_longitude_structure_i_idx" ON "users"("code", "status", "cash_count", "latitude", "longitude", "structure_id", "incasator_id", "created_at");
