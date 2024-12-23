import { CreateVendorRequest } from '@interfaces'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateVendorDTO implements CreateVendorRequest {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  vendorId: number

  @IsNotEmpty()
  @IsNumber()
  type: number

  @IsNotEmpty()
  @IsArray()
  numberPrefix: string[]
}
