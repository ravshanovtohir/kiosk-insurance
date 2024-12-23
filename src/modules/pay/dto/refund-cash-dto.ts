import { RefundCashRequest } from '@interfaces'
import { IsString } from 'class-validator'

export class RefundCashDTO implements RefundCashRequest {
  @IsString()
  phoneNumber: string
}
