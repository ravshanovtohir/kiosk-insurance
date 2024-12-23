import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator'
import { StepThreeRequest } from '@interfaces'

export class StepThreeRequestDTO implements StepThreeRequest {
  @IsNotEmpty()
  @IsNumber()
  company_id: number

  @IsNotEmpty()
  @IsNumber()
  service_id: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2)
  step_status: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  relative: number

  @IsOptional()
  @IsString()
  @Length(2, 2)
  @Matches(/[A-Z]{2}/, { message: 'Invalid passport seria!' })
  seria: string

  @IsOptional()
  @IsString()
  @Length(7, 7)
  @Matches(/[0-9]{7}/, { message: 'Invalid passport number!' })
  number: string

  @IsOptional()
  @IsString()
  @Length(10, 10)
  @Matches(/\d{4}-\d{2}-\d{2}/, { message: 'Birth Date format must be YYYY-MM-DD!' })
  birthDate: string

  step: number
}
