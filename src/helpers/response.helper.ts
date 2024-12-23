import { Response, Pagination } from '@interfaces'

export function formatResponse<T>(status: number, data: T, pagination?: Pagination): Response<T> {
  return { status, data, pagination }
}
