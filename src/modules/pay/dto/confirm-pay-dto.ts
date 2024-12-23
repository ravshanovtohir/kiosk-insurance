import { ConfirmPaymentRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmPayDTO implements ConfirmPaymentRequest {
  @IsNotEmpty()
  @IsString()
  confirmation_code: string
}
