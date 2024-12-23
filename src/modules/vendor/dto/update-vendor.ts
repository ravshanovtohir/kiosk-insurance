import { UpdateVendorRequest } from '@interfaces'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateVendorDTO implements UpdateVendorRequest {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsNumber()
  vendorId: number

  @IsOptional()
  @IsNumber()
  type: number

  @IsOptional()
  @IsArray()
  numberPrefix: string[]
}
