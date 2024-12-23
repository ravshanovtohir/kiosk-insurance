import { CreateUserRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateUserDTO implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string

  role: number

  @IsNotEmpty()
  @IsNumber()
  structureId: number

  // @IsNotEmpty()
  // @IsNumber()
  incasatorId: number

  @IsOptional()
  @IsString()
  latitude?: string

  @IsOptional()
  @IsString()
  longitude?: string
}
