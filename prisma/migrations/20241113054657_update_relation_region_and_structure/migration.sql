-- AddForeignKey
ALTER TABLE "structures" ADD CONSTRAINT "structures_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
