import { CreateStructureRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateStructureDTO implements CreateStructureRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  status: number

  @IsNotEmpty()
  @IsNumber()
  regionId: number
}
