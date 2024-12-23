import { UpdateRegionRequest } from '@interfaces'

export class UpdateRegionDTO implements UpdateRegionRequest {
  name?: string
  status?: number
}
