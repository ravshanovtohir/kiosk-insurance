import { Module } from '@nestjs/common'
import { InfinityRequestService } from './request.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [InfinityRequestService],
  exports: [InfinityRequestService],
})
export class RequestModule {}
