import { UpdateFcmTokenRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateFcmTokenDTO implements UpdateFcmTokenRequest {
  @IsString()
  @IsNotEmpty()
  fcmToken: string
}
