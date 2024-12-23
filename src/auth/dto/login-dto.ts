import { LoginRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDtoRequest implements LoginRequest {
  @IsString()
  @IsNotEmpty()
  login: string

  @IsString()
  @IsNotEmpty()
  password: string
}
