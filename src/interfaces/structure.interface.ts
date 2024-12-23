import { Region } from '@interfaces'
import { Changer } from '@interfaces'
export interface CreateStructureRequest {
  name: string
  status: number
  regionId: number
}

export interface UpdateStructureRequest {
  name?: string
  status?: number
  regionId?: number
}

export interface StructureResponse {
  id: number
  name: string
  status: Changer
  region: Region
  createdAt: Date
}

// export interface FindAllStructureResponse {
//   data: FindStructure[]
//   pagination: Pagination
// }

// export interface FindOneStructureResponse {
//   data: FindStructure
// }
