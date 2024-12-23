import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class FindOneUserDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number
}
