import { Pagination } from './pagination.interface'
import { Changer } from './status.interface'

export interface CreateBankRequest {
  name: string
  percentage: number
  regionId: number
}

export interface UpdateBankRequest {
  name?: string
  percentage?: number
  regionId?: number
}

interface Region {
  id: number
  name: string
  status: Changer
  createdAt: Date
}

export interface BankModel {
  id: number
  name: string
  percentage: number
  region: Region
  createdAt: Date
}

export interface FindBankResponse {
  data: BankModel[]
  pagination: Pagination
}

export interface FindOneBankResponse {
  data: BankModel
}
