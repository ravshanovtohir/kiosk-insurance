import { IsString, IsOptional, IsNumber } from 'class-validator'
import { UpdateBankRequest } from '@interfaces'

export class UpdateBankDTO implements UpdateBankRequest {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  percentage: number

  @IsOptional()
  @IsNumber()
  regionId: number
}
