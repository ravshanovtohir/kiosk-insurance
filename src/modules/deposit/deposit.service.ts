import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateDepositRequest,
  FindAllDepositResponse,
  FindOneDepositResponse,
  UpdateFcmTokenRequest,
  DepositResponse,
} from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { DepositStatus, DepositStatusOutPut } from 'enums/deposit.enum'
import { FilterService, paginationResponse, formatResponse } from '@helpers'
import * as admin from 'firebase-admin'
import { HttpStatus, UserBalanceHistoryStatus } from '@enums'
import { Pagination } from 'enums/pagination.enum'
import { Deposit } from '@prisma/client'
@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<Omit<FindAllDepositResponse, 'pagination'>> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const deposits: Deposit[] = await FilterService?.applyFilters(
      'deposit',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
    )

    const result = []

    for (const deposit of deposits) {
      let statusOutPut = ''

      switch (deposit.status) {
        case DepositStatus.STATUS_CREATE:
          statusOutPut = DepositStatusOutPut.STATUS_CREATE
          break
        case DepositStatus.STATUS_WAIT:
          statusOutPut = DepositStatusOutPut.STATUS_WAIT
          break
        case DepositStatus.STATUS_SUCCESS:
          statusOutPut = DepositStatusOutPut.STATUS_SUCCESS
          break
        case DepositStatus.STATUS_ERROR:
          statusOutPut = DepositStatusOutPut.STATUS_ERROR
          break
        default:
          statusOutPut = 'UNKNOWN'
      }

      result.push({
        id: deposit.id,
        amount: Number(deposit.amount),
        status: {
          int: deposit?.status,
          string: statusOutPut,
        },
        comment: deposit.comment,
        checkPhoto: deposit.checkPhoto,
        type: deposit.type,
        source: deposit.source,
        cashCount: deposit.cashCount,
        operatorId: deposit.operatorId,
        incasatorId: deposit.incasatorId,
        confirmedId: deposit.confirmedId,
        bankId: deposit.bankId,
        createdAt: deposit.createdAt,
      })
    }

    const pagination = paginationResponse(deposits.length, limit, page)

    return formatResponse(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number): Promise<FindOneDepositResponse> {
    const deposit = await this.prisma.deposit.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!deposit) {
      throw new NotFoundException('Deposit not found with given ID!')
    }

    let statusOutPut = ''

    switch (deposit.status) {
      case DepositStatus.STATUS_CREATE:
        statusOutPut = DepositStatusOutPut.STATUS_CREATE
        break
      case DepositStatus.STATUS_WAIT:
        statusOutPut = DepositStatusOutPut.STATUS_WAIT
        break
      case DepositStatus.STATUS_SUCCESS:
        statusOutPut = DepositStatusOutPut.STATUS_SUCCESS
        break
      case DepositStatus.STATUS_ERROR:
        statusOutPut = DepositStatusOutPut.STATUS_ERROR
        break
      default:
        statusOutPut = 'UNKNOWN'
    }

    const result: DepositResponse = {
      id: deposit.id,
      amount: Number(deposit?.amount),
      status: {
        int: deposit?.status,
        string: statusOutPut,
      },
      comment: deposit.comment,
      checkPhoto: deposit.checkPhoto,
      type: deposit.type,
      source: deposit.source,
      cashCount: deposit.cashCount,
      operatorId: deposit.operatorId,
      incasatorId: deposit.incasatorId,
      confirmedId: deposit.confirmedId,
      bankId: deposit.bankId,
      createdAt: deposit.createdAt,
    }

    return formatResponse<DepositResponse>(HttpStatus.OK, result)
  }

  async findDepositStatic(userId: number, query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const depositStatic: Deposit[] = await FilterService?.applyFilters(
      'deposit',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
    )

    const deposits = depositStatic.reduce((acc, deposit) => {
      if (deposit?.incasatorId === userId) {
        acc.push(deposit)
      }
      return acc
    }, [])

    const result: DepositResponse[] = deposits.map((deposit) => {
      let statusOutPut = ''

      switch (deposit.status) {
        case DepositStatus.STATUS_CREATE:
          statusOutPut = DepositStatusOutPut.STATUS_CREATE
          break
        case DepositStatus.STATUS_WAIT:
          statusOutPut = DepositStatusOutPut.STATUS_WAIT
          break
        case DepositStatus.STATUS_SUCCESS:
          statusOutPut = DepositStatusOutPut.STATUS_SUCCESS
          break
        case DepositStatus.STATUS_ERROR:
          statusOutPut = DepositStatusOutPut.STATUS_ERROR
          break
        default:
          statusOutPut = 'UNKNOWN'
      }

      return {
        id: deposit?.id,
        amount: Number(deposit?.amount),
        status: {
          int: deposit?.status,
          string: statusOutPut,
        },
        comment: deposit?.comment,
        checkPhoto: deposit?.checkPhoto,
        type: deposit?.type,
        source: deposit?.source,
        cashCount: deposit?.cashCount,
        operatorId: deposit?.operatorId,
        incasatorId: deposit?.incasatorId,
        confirmedId: deposit?.confirmedId,
        bankId: deposit?.bankId,
        createdAt: deposit?.createdAt,
      }
    })

    const pagination = paginationResponse(deposits.length, limit, page)

    return formatResponse<DepositResponse[]>(HttpStatus.OK, result, pagination)
  }

  async create(data: CreateDepositRequest, incasatorId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const opearatorExists = await prisma.user.findUnique({
        where: {
          id: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      if (!opearatorExists) {
        throw new NotFoundException('Operator not found!')
      }

      const incasator = await prisma.user.findUnique({
        where: {
          id: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      const cashCount = opearatorExists?.cashCount

      await prisma.user.update({
        where: {
          id: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          cashCount: 0,
          updatedAt: new Date(),
        },
      })

      await prisma.user.update({
        where: {
          id: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          cashCount: Number(incasator.cashCount) + Number(cashCount),
        },
      })

      const totalAmountInOperator = await prisma.userBalance.findUnique({
        where: {
          userId: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      const incasatorBalance = await prisma.userBalance.findUnique({
        where: {
          userId: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
      })

      await prisma.userBalance.update({
        where: {
          userId: data?.operatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          balance: 0,
          updatedAt: new Date(),
        },
      })

      const incasatorBalanceUpdated = await prisma.userBalance.update({
        where: {
          userId: incasatorId,
          deletedAt: {
            equals: null,
          },
        },
        data: {
          balance: Number(totalAmountInOperator?.balance) + Number(incasatorBalance?.balance),
          updatedAt: new Date(),
        },
      })

      await prisma.deposit.create({
        data: {
          operatorId: data?.operatorId,
          incasatorId: incasatorId,
          amount: incasatorBalanceUpdated?.balance,
          cashCount: cashCount,
          status: DepositStatus.STATUS_CREATE,
        },
      })

      await prisma.userBalanceHistory.create({
        data: {
          amount: Number(totalAmountInOperator.balance),
          userId: incasatorId,
          type: UserBalanceHistoryStatus.PLUS,
        },
      })

      await prisma.userBalanceHistory.create({
        data: {
          amount: Number(totalAmountInOperator.balance),
          userId: data?.operatorId,
          type: UserBalanceHistoryStatus.MINUS,
        },
      })

      return {
        status: 201,
        message: 'Deposit succesfully created',
        depositStatus: DepositStatusOutPut.STATUS_CREATE,
      }
    })
  }

  async update(id: number, userId: number, data: any, file: Express.Multer.File) {
    const deposit = await this.prisma.deposit.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!deposit) {
      throw new NotFoundException('Deposit not found with given ID!')
    }

    await this.prisma.user.update({
      where: {
        id: userId,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        cashCount: 0,
      },
    })

    await this.prisma.deposit.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        checkPhoto: file?.filename,
        bankId: +data?.bankId,
        comment: data?.comment,
        updatedAt: new Date(),
        status: DepositStatus.STATUS_WAIT,
      },
    })

    await this.prisma.userBalance.findFirst({
      where: {
        userId: userId,
        deletedAt: {
          equals: null,
        },
      },
    })

    return {
      status: 201,
      message: 'Deposit succesfully sended via bank!',
      depositStatus: DepositStatusOutPut.STATUS_WAIT,
    }
  }

  async updateDepositAccountant(id: number, data: any) {
    const deposit = await this.prisma.deposit.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!deposit) {
      throw new NotFoundException('Deposit not found with given ID!')
    }

    await this.prisma.deposit.update({
      where: {
        id: id,
      },
      data: {
        status: data?.status,
        updatedAt: new Date(),
      },
    })

    const user = await this.prisma.user.findUnique({
      where: {
        id: deposit?.incasatorId,
        deletedAt: {
          equals: null,
        },
      },
    })

    const balance = await this.prisma.userBalance.findFirst({
      where: {
        userId: user.id,
        deletedAt: {
          equals: null,
        },
      },
    })
    const userBalance = balance.balance

    await this.prisma.userBalance.update({
      where: {
        id: user.id,
      },
      data: {
        balance: 0,
      },
    })

    await this.prisma.userBalanceHistory.create({
      data: {
        amount: Number(userBalance),
        userId: user?.id,
        type: UserBalanceHistoryStatus.MINUS,
      },
    })

    return {
      status: 201,
      message: 'succes',
    }
  }

  async sendNotification(data: any) {
    const response = await admin
      .messaging()
      .send({
        token: data?.token,
        webpush: {
          notification: {
            title: data?.title,
            body: data?.body,
          },
        },
      })
      .catch((err) => {
        console.log(err)
        throw new BadRequestException('Someting went wrong')
      })

    return response
  }

  async updateFcmToken(data: UpdateFcmTokenRequest, userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('User not found with given ID!')
    }

    await this.prisma.user.update({
      where: {
        id: userId,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        fcmToken: data?.fcmToken,
      },
    })
  }

  async remove(id: number) {
    const depositExists = await this.prisma.deposit.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!depositExists) {
      throw new NotFoundException('Deposit not found with given ID!')
    }

    await this.prisma.deposit.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
