import { Changer } from './status.interface'

export interface CreateVendorRequest {
  title: string
  vendorId: number
  type: number
  numberPrefix: string[]
}

export interface UpdateVendorRequest {
  title?: string
  vendorId?: number
  type?: number
  numberPrefix?: string[]
}

export interface VendorModel {
  id: number
  title: string
  vendorId: number
  type: Changer
  numberPrefix: string[]
  createdAt: Date
}
