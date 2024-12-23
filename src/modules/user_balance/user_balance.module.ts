import { Module } from '@nestjs/common'
import { UserBalanceService } from './user_balance.service'
import { UserBalanceController } from './user_balance.controller'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserBalanceController],
  providers: [UserBalanceService],
})
export class UserBalanceModule {}
