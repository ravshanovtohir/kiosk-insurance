import { GetServiceRequest } from '@interfaces'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class getServiceRequestDTO implements GetServiceRequest {
  @IsNumber()
  @IsNotEmpty()
  company_id: number
}
