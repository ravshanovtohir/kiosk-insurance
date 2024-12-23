import { HttpStatus, Pagination, UserRoles, UserRolesOutPut, UserStatus, UserStatusOutPut } from '@enums'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { Balance } from '@interfaces'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UserBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const userBalances = await FilterService?.applyFilters(
      'userBalance',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['user'],
    )

    const pagination = paginationResponse(userBalances.length, limit, page)

    const result: Balance[] = []

    userBalances.map((balance: any) => {
      result.push({
        id: balance?.id,
        balance: Number(balance?.balance),
        createdAt: balance?.createdAt,
        user: {
          id: balance?.user?.id,
          name: balance?.user?.name,
          login: balance?.user?.login,
          code: balance?.user?.code,
          role: {
            int: balance?.user?.role,
            string: UserRolesOutPut[UserRoles[balance?.user?.role] as keyof typeof UserRolesOutPut],
          },
          status: {
            int: balance?.user?.status,
            string: UserStatusOutPut[UserStatus[balance?.user?.status] as keyof typeof UserStatusOutPut],
          },
          createdAt: balance?.user?.createdAt,
        },
      })
    })

    return formatResponse<Balance[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const userBalance = await this.prisma.userBalance.findUnique({
      where: {
        userId: id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        user: true,
      },
    })

    if (!userBalance) {
      throw new NotFoundException('User Balance Not found with fiven User Id!')
    }

    const result: Balance = {
      id: userBalance?.id,
      balance: Number(userBalance?.balance),
      createdAt: userBalance?.createdAt,
      user: {
        id: userBalance?.user?.id,
        name: userBalance?.user?.name,
        login: userBalance?.user?.login,
        code: userBalance?.user?.code,
        role: {
          int: userBalance?.user?.role,
          string: UserRolesOutPut[UserRoles[userBalance?.user?.role] as keyof typeof UserRolesOutPut],
        },
        status: {
          int: userBalance?.user?.status,
          string: UserStatusOutPut[UserStatus[userBalance?.user?.status] as keyof typeof UserStatusOutPut],
        },
        createdAt: userBalance?.user?.createdAt,
      },
    }
    return formatResponse<Balance>(HttpStatus.OK, result)
  }

  async findStaticUserBalance(id: number) {
    const userBalance = await this.prisma.userBalance.findUnique({
      where: {
        userId: id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        user: true,
      },
    })

    if (!userBalance) {
      throw new NotFoundException('User Balance Not found with fiven User Id!')
    }

    const result: Balance = {
      id: userBalance?.id,
      balance: Number(userBalance?.balance),
      createdAt: userBalance?.createdAt,
      user: {
        id: userBalance?.user?.id,
        name: userBalance?.user?.name,
        login: userBalance?.user?.login,
        code: userBalance?.user?.code,
        role: {
          int: userBalance?.user?.role,
          string: UserRolesOutPut[UserRoles[userBalance?.user?.role] as keyof typeof UserRolesOutPut],
        },
        status: {
          int: userBalance?.user?.status,
          string: UserStatusOutPut[UserStatus[userBalance?.user?.status] as keyof typeof UserStatusOutPut],
        },
        createdAt: userBalance?.user?.createdAt,
      },
    }

    return formatResponse<Balance>(HttpStatus.OK, result)
  }
}
