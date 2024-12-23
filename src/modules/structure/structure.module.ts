import { Module } from '@nestjs/common'
import { StructureService } from './structure.service'
import { StructureController } from './structure.controller'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [StructureController],
  providers: [StructureService],
})
export class StructureModule {}
