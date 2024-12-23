import { UpdateNotificationRequest } from '@interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateNotificationDTO implements UpdateNotificationRequest {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  content: string

  @IsOptional()
  @IsNumber()
  type: number

  @IsOptional()
  @IsNumber()
  userId: number
}
