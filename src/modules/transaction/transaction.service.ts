import { Pagination } from '@enums'
import { FilterService, paginationResponse } from '@helpers'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const transactions = await FilterService?.applyFilters(
      'transaction',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['user'],
    )

    const pagination = paginationResponse(transactions.length, limit, page)

    const result: any = []
    transactions?.map((transaction: any) => {
      result.push({
        id: transaction.id,
        userId: transaction?.userId,
        insuranceId: transaction?.insuranceId,
        vendorId: transaction?.vendorId,
        anketaId: transaction?.anketaId,
        amount: transaction?.amount?.toString(),
        structureId: transaction?.structureId,
        payerPhone: transaction?.payerPhone,
        merchantId: transaction?.merchantId,
        partnerTransactionId: transaction?.partnerTransactionId,
        status: {
          id: transaction?.status,
          string: transaction?.status,
        },
        paymentId: transaction?.paymentId,
        partnerId: transaction?.partnerId,
        cardNumber: transaction?.cardNumber,
        cardExpire: transaction?.cardExpire,
        retry: transaction?.retry,
        createdAt: transaction?.createdAt,
        user: {
          id: transaction?.user?.id,
          name: transaction?.user?.name,
          login: transaction?.user?.login,
          code: transaction?.user?.code,
          role: transaction?.user?.role,
          status: transaction?.user?.status,
          cashCount: transaction?.user?.cashCount,
          latitude: transaction?.user?.latitude,
          longitude: transaction?.user?.longitude,
          structureId: transaction?.user?.structureId,
          incasatorId: transaction?.user?.incasatorId,
        },
      })
    })

    return {
      data: result,
      pagination: pagination,
    }
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!transaction) {
      throw new NotFoundException('Transaction not found with given ID!')
    }

    return {
      data: transaction,
    }
  }
}
