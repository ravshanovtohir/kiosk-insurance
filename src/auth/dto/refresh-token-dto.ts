import { RefreshTokenRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDTO implements RefreshTokenRequest {
  @IsString()
  @IsNotEmpty()
  token: string
}
