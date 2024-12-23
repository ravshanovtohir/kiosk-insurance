import { Changer, Pagination } from '@interfaces'
export interface CreateRegionRequest {
  name: string
  status?: number
}

export interface UpdateRegionRequest {
  name?: string
  status?: number
}

interface Structure {
  id: number
  name: string
  status: Changer
  createdAt: Date
}

export interface Region {
  id: number
  name: string
  status: Changer
  structures?: Structure[]
  createdAt: Date
}

export interface FindAllRegionResponse {
  data: Region[]
  pagination: Pagination
}

export interface FindOneRegionResponse {
  data: Region
}
