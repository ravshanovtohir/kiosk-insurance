import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule, UsersService } from '@modules'
import { AuthController } from './auth.controller'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [UsersModule, PrismaModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
