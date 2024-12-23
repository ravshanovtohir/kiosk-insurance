import { UpdatePartnerRequest } from '@interfaces'
import { IsOptional, IsNumber, IsString } from 'class-validator'
export class UpdatePartnerDTO implements UpdatePartnerRequest {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  partnerId: number

  @IsOptional()
  @IsNumber()
  status: number

  @IsOptional()
  @IsNumber()
  limitedAmountInRegion: number

  @IsOptional()
  @IsNumber()
  limitedAmountTashkent: number

  @IsOptional()
  @IsNumber()
  unLimitedAmountInRegion: number

  @IsOptional()
  @IsNumber()
  unLimitedAmountTashkent: number
}
