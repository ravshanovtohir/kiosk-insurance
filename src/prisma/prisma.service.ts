import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect()
      console.log('Database connection has been established successfully.')
    } catch (err) {
      console.error('Database connection failed.', err)
    }
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
