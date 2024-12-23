import { Changer, Pagination } from '@interfaces'

export interface Balance {
  id: number
  balance: number
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

export interface FindAllUserBalanceResponse {
  data: Balance[]
  pagination: Pagination
}

export interface FindOneUserBalanceResponse {
  data: Balance
}
