import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { RequestModule } from 'gateRequest'
import {
  UsersModule,
  CompanyModule,
  PayModule,
  BankModule,
  RegionModule,
  DepositModule,
  PartnerModule,
  StructureModule,
  UserBalanceModule,
  BalanceHistoryModule,
  ReportModule,
  NotificationModule,
  TransactionModule,
  VendorModule,
} from '@modules'
import { pspConfig } from '@config'
import { AuthModule } from 'auth/auth.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pspConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    RequestModule,
    UsersModule,
    CompanyModule,
    PayModule,
    AuthModule,
    BankModule,
    RegionModule,
    PartnerModule,
    StructureModule,
    DepositModule,
    UserBalanceModule,
    BalanceHistoryModule,
    ReportModule,
    NotificationModule,
    TransactionModule,
    VendorModule,
  ],
  controllers: [],
  providers: [],
})
export class App {}
