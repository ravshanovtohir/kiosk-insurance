import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { isJWT } from 'class-validator'
import { ErrorCodes } from '@enums'
import { verifyJwt } from '@helpers'
import { jwtConstants } from '@constants'
import { CustomRequest } from 'custom/request.custom'
import { PrismaService } from 'prisma/prisma.service'
import { Role } from '@decorators'
import { ROLES_KEY } from '@constants'

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  private getAccessToken(context: ExecutionContext): string | undefined {
    const type = context.getType()

    if (type === 'http') {
      const request = context.switchToHttp().getRequest<CustomRequest>()
      return request.headers.authorization?.replace(/^(bearer)\s/i, '')
    } else if (type === 'ws') {
      const client = context.switchToWs().getClient()
      return client.handshake.query.token
    }

    return undefined
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [context.getHandler(), context.getClass()])

    const request = context.switchToHttp().getRequest<CustomRequest>()

    const accessToken: string | undefined = this.getAccessToken(context)

    if (!accessToken || !isJWT(accessToken)) {
      throw new UnauthorizedException(ErrorCodes.ACCESS_TOKEN_NOT_VALID)
    }

    const verified = verifyJwt(accessToken, jwtConstants.secret)

    const user = await this.prisma.user.findUnique({
      where: {
        id: verified.id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED)
    }

    if (!requiredRoles?.role?.some((role) => user?.role === role)) {
      throw new ForbiddenException(ErrorCodes.PERMISSION_DENIED)
    }

    request.user = verified
    return true
  }
}
