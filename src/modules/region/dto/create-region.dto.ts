import { CreateRegionRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateRegionDTO implements CreateRegionRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNumber()
  @IsOptional()
  status?: number
}
