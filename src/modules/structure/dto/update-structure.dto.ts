import { UpdateStructureRequest } from '@interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateStructureDTO implements UpdateStructureRequest {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  regionId?: number

  @IsOptional()
  @IsNumber()
  status?: number
}
