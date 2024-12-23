import { Changer } from './status.interface'

export interface NotificationResponse {
  id: number
  title: string
  content: string
  type: Changer
  userId: number
  createdAt: Date
}

export interface CreateNotificationRequest {
  title: string
  content: string
  type: number
  userId: number
}

export interface UpdateNotificationRequest {
  title?: string
  content?: string
  type?: number
  userId?: number
}
