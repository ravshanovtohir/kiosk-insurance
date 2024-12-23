import { CreatePartnerRequest } from '@interfaces'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePartnerDTO implements CreatePartnerRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  partnerId: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  status?: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limitedAmountInRegion: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limitedAmountTashkent: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  unLimitedAmountInRegion: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  unLimitedAmountTashkent: number
}
