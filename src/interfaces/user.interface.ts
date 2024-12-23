import { Changer, Pagination } from '@interfaces'

export interface Structure {
  id: number
  name: string
  status: Changer
  createdAt: Date
}

export interface CreateUserRequest {
  name: string
  login: string
  password: string
  role: number
  structureId: number
  incasatorId: number
  latitude?: string
  longitude?: string
}

export interface UpdateUserRequest {
  name?: string
  login?: string
  password?: string
  role?: number
  structureId?: number
  incasatorId?: number
  latitude?: string
  longitude?: string
}

export interface UserResponse {
  id: number
  name: string
  login: string
  code: string
  role: Changer
  status: Changer
  cashCount: number
  latitude: string
  longitude: string
  createdAt: Date
  structure: Structure
  incasatorId: number | null
}
export interface FindAllUserResponse {
  data: UserResponse[]
  pagination?: Pagination
}

export interface FindOneUserResponse {
  data: UserResponse
}

export interface GetMeUser {
  id?: number
  name?: string
  login: string
  code?: string
  role: Changer
  status: Changer
  cashCount?: number
  latitude?: number
  longitude?: number
  createdAt?: Date
  structure?: string
  incasatorId?: string
}

export interface GetMeResponse {
  data: GetMeUser
}
