import { StepTwoRequest } from '@interfaces'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Length,
  Matches,
  isNotEmpty,
  IsBooleanString,
} from 'class-validator'

export class StepTwoRequestDTO implements StepTwoRequest {
  @IsNotEmpty()
  @IsNumber()
  company_id: number

  @IsNotEmpty()
  @IsNumber()
  service_id: number

  @IsNotEmpty()
  @IsBooleanString()
  applicantIsOwner: string

  @IsNotEmpty()
  @IsString()
  @Length(12, 12)
  @Matches(/998[0-9]{9}/, { message: 'Invalid phone number!' })
  phoneNumber: string

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(/[A-Z]{2}/, { message: 'Invalid passport seria!' })
  seria: string

  @IsNotEmpty()
  @IsString()
  @Length(7, 7)
  @Matches(/[0-9]{7}/, { message: 'Invalid passport number!' })
  number: string

  @IsNotEmpty()
  @IsBooleanString()
  driverNumberRestriction: string

  // @IsNotEmpty()
  // @IsString()
  // @Matches(/\d{4}-\d{2}-\d{2}/, { message: 'Start Date format must be YYYY-MM-DD!' })
  startDate: string

  step: number
}
