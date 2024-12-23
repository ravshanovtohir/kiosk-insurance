import { CreateNotificationRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNotificationDTO implements CreateNotificationRequest {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsNumber()
  type: number

  @IsNotEmpty()
  @IsNumber()
  userId: number
}
