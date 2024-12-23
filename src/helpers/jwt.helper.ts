import type { JwtModel } from '@interfaces'
import { UnauthorizedException } from '@nestjs/common'
import { sign, TokenExpiredError, verify } from 'jsonwebtoken'

export const verifyJwt = (token: string, secret: string): JwtModel | null => {
  try {
    const decoded: any = verify(token, secret)

    console.log('verifyJwt', decoded)

    if (!decoded) {
      return null
    }

    return decoded.data as JwtModel
  } catch (err) {
    if (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('JWT token has expired')
      }
      throw new UnauthorizedException('Invalid JWT token')
    }
  }
}

export const signJwt = (payload: JwtModel, secret: string, exp: number): string =>
  sign({ data: payload }, secret, { expiresIn: exp })
