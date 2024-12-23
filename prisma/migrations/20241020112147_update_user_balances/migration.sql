-- AddForeignKey
ALTER TABLE "user_balance_history" ADD CONSTRAINT "user_balance_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
