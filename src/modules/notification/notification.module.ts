import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { PrismaModule } from 'prisma/prisma.module'
import { FirebaseService } from '@helpers'

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService, FirebaseService],
  exports: [FirebaseService],
})
export class NotificationModule {}
