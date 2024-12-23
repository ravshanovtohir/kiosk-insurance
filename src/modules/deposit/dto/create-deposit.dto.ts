import { CreateDepositRequest } from '@interfaces'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateDepositDTO implements CreateDepositRequest {
  @IsNotEmpty()
  @IsNumber()
  operatorId: number
}
