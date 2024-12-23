import { IsString, IsNumber, IsPositive } from 'class-validator'
import { CreateBankRequest } from '@interfaces'

export class CreateBankDTO implements CreateBankRequest {
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  percentage: number

  @IsNumber()
  regionId: number
}
