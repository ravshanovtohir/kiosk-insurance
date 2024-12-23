import { GetStepRequest } from '@interfaces'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class getStepRequestDTO implements GetStepRequest {
  @IsNumber()
  @IsNotEmpty()
  company_id: number

  @IsNumber()
  @IsNotEmpty()
  service_id: number
}
