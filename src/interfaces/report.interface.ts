import { Changer } from './status.interface'

export interface ReportByRegionResponse {
  data: ReportByRegion[]
}

export interface ReportByRegion {
  id: number
  region: string
  status: Changer
  countOfStructures: number
  countOfOperators: number
  balanceOperators: number
}
