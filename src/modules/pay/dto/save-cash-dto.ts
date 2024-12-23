import { IsNotEmpty, IsNumber } from 'class-validator'

export class SaveEveryCashDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number
}
