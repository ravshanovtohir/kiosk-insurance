import { PreparePayCardRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class PreparePayCardDTO implements PreparePayCardRequest {
  @IsNotEmpty()
  @IsString()
  card_number: string

  @IsNotEmpty()
  @IsString()
  card_expire: string
}
