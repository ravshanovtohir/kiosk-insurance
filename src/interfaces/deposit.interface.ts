import { Pagination } from '@interfaces'

export interface CreateDepositRequest {
  operatorId: number
}

interface DepositStatus {
  int: number
  string: string
}

export interface DepositResponse {
  id: number
  amount: number
  status: DepositStatus
  comment: string | null
  checkPhoto: string | null
  type: number
  source: number
  cashCount: number
  operatorId: number
  incasatorId: number
  confirmedId: number
  bankId: number
  createdAt: Date
}

export interface FindAllDepositResponse {
  data: DepositResponse[]
  pagination: Pagination
}

export interface FindOneDepositResponse {
  data: DepositResponse
}

export interface UpdateFcmTokenRequest {
  fcmToken: string
}
