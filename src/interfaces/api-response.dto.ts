import { Pagination } from '@interfaces'

export class ApiResponse<T> {
  status: number

  data?: T

  constructor(status: number, message: string, data?: T) {
    this.status = status
    this.data = data
  }
}

export interface Response<T> {
  status: number
  data: T
  pagination?: Pagination
}

export interface DeleteRequestResponse {
  status: number
}
