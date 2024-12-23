import { jwtConstants } from '@constants'
import { GetMeResponse, LoginRequest, LoginResponse } from '@interfaces'
import { UsersService } from '@modules'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { signJwt, verifyJwt } from '@helpers'
import { PrismaService } from 'prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { ErrorCodes, UserRoles, UserRolesOutPut, UserStatus, UserStatusOutPut } from '@enums'
import { isJWT } from 'class-validator'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly prisma: PrismaService,
  ) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.usersService.validate({ login: data.login })

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.secret,
      60 * 60 * 24 * 7,
    )

    const refreshToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.secret,
      60 * 60 * 24 * 10,
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(token: string, userId: number) {
    if (!token || !isJWT(token)) {
      throw new UnauthorizedException(ErrorCodes.ACCESS_TOKEN_NOT_VALID)
    }

    const verified = verifyJwt(token, jwtConstants.secret)

    const user = await this.prisma.user.findUnique({
      where: {
        id: verified.id,
      },
    })

    if (!user || !(userId === user.id)) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED)
    }

    const accessToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.secret,
      60 * 60 * 24 * 7,
    )

    const refreshToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.secret,
      60 * 60 * 24 * 10,
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  async getMe(userId: number): Promise<GetMeResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structure: true,
      },
    })

    const result = {
      id: user?.id,
      name: user?.name,
      login: user.login,
      code: user?.code,
      role: {
        int: user?.role,
        string: UserRolesOutPut[UserRoles[user.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: user?.status,
        string: UserStatusOutPut[UserStatus[user?.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: user?.cashCount,
      latitude: Number(user?.latitude),
      longitude: Number(user?.longitude),
      createdAt: user?.createdAt,
      structure: user?.structure?.name,
    }

    return {
      data: result,
    }
  }
}
