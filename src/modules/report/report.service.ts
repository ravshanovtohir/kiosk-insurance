import { HttpStatus, RegionStatus, RegionStatusOutPut, UserRoles } from '@enums'
import { formatResponse } from '@helpers'
import { ReportByRegion, ReportByRegionResponse } from '@interfaces'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all report`
  }

  async reportByRegion(): Promise<ReportByRegionResponse> {
    const data = await this.prisma.region.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structures: {
          where: {
            deletedAt: {
              equals: null,
            },
          },
          include: {
            user: {
              where: {
                deletedAt: {
                  equals: null,
                },
              },
              include: {
                userBalance: true,
              },
            },
          },
        },
      },
    })

    const result = data?.map((region) => {
      const operatorData = region?.structures?.reduce(
        (acc, structure) => {
          structure?.user?.forEach((user) => {
            if (user.role === UserRoles.OPERATOR) {
              acc.operators += 1
              acc.balance += Number(user?.userBalance.balance) || 0
            }
          })
          return acc
        },
        { operators: 0, balance: 0 },
      )

      return {
        id: region?.id,
        region: region?.name,
        status: {
          int: region?.status,
          string: RegionStatusOutPut[RegionStatus[region?.status] as keyof typeof RegionStatusOutPut],
        },
        countOfStructures: region?.structures.length,
        countOfOperators: operatorData.operators,
        balanceOperators: operatorData.balance,
      }
    })
    return formatResponse<ReportByRegion[]>(HttpStatus.OK, result)
  }

  async reportByStructure() {}
  async reportByUser() {}
  async reportByUserBalance() {}

  findOne(id: number) {
    return `This action returns a #${id} report`
  }
}

//region bo'yicha, structure bo'yicha, userlar bo'yicha, user balancelar bo'yicha
