import { JwtModel } from '@interfaces'
import { Request } from 'express'

export interface CustomRequest extends Request {
  user: JwtModel
}
