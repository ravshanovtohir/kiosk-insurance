import { PrepareToPayRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class PrepareToPayDTO implements PrepareToPayRequest {
  @IsNotEmpty()
  @IsString()
  phone_number: string

  @IsNotEmpty()
  @IsString()
  amount: string

  @IsNumber()
  @IsOptional()
  vendor_id: number
}
