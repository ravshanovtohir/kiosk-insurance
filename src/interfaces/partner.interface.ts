import { Changer } from '@interfaces'

export interface CreatePartnerRequest {
  name: string
  partnerId: number
  status?: number
  unLimitedAmountTashkent: number
  limitedAmountTashkent: number
  unLimitedAmountInRegion: number
  limitedAmountInRegion: number
}

export interface UpdatePartnerRequest {
  name?: string
  partnerId?: number
  image?: string
  status?: number
  unLimitedAmountTashkent?: number
  limitedAmountTashkent?: number
  unLimitedAmountInRegion?: number
  limitedAmountInRegion?: number
}

export interface PartnerModel {
  id: number
  name: string
  partnerId: number
  image: string
  status: Changer
  unLimitedAmountTashkent: number
  limitedAmountTashkent: number
  unLimitedAmountInRegion: number
  limitedAmountInRegion: number
  createdAt: Date
}

export interface PartnerModelUpdate {
  id?: number
  name?: string
  partnerId?: number
  status?: Changer
  unLimitedAmountTashkent?: number
  limitedAmountTashkent?: number
  unLimitedAmountInRegion?: number
  limitedAmountInRegion?: number
  createdAt?: Date
}

export interface FindAllPartnerResponse {
  status: number
  data: PartnerModel[]
}
export interface FindOnePartnerResponse {
  data: PartnerModel
}

export interface FindActivePartners {
  jsonrpc: string
  result: Companies[]
}

export interface Companies {
  name: string
  company_id: number
  image: string
}

export interface CreatePartnerResponse {
  status: number
  data: PartnerModel
}

export interface UpdatePartnerResponse {
  status: number
  data: PartnerModelUpdate
}
