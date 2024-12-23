import { StepOneRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString, Matches, Length } from 'class-validator'

export class stepOneRequestDTO implements StepOneRequest {
  @IsNumber()
  @IsNotEmpty()
  company_id: number

  @IsNumber()
  @IsNotEmpty()
  service_id: number

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, { message: 'seria must be exactly 3 uppercase letters' })
  seria: string

  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  @Matches(/^[0-9]{7}$/, { message: 'texpnumber must be exactly 7 digits' })
  number: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @Matches(/\d{2}[A-Z]\d{3}[A-Z]{2}|\d{5}[A-Z]{3}/, { message: 'govNumber must match the specified pattern' })
  govNumber: string

  step: number
}
