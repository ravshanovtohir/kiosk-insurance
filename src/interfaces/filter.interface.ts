export interface Filter {
  column: string
  value: string
  operator: string
}

export interface Sort {
  column: string
  value: 'asc' | 'desc'
}

export class QueryParams {
  filters: Filter[]
  sort: Sort
  limit: number
  page: number
}
