import { Changer, Pagination } from '@interfaces'

export interface BalanceHistory {
  id: number
  amount: number
  type: Changer
  createdAt: Date
  user: User
}

interface User {
  id: number
  name: string
  login: string
  code: string
  role: Changer
  status: Changer
  createdAt: Date
}

export interface FindAllUserBalanceHistoryResponse {
  data: BalanceHistory[]
  pagination: Pagination
}

export interface FindOneUserBalanceHistoryResponse {
  data: BalanceHistory
}
