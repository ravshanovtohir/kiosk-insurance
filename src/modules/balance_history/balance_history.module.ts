import { Module } from '@nestjs/common'
import { BalanceHistoryService } from './balance_history.service'
import { BalanceHistoryController } from './balance_history.controller'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [BalanceHistoryController],
  providers: [BalanceHistoryService],
})
export class BalanceHistoryModule {}
