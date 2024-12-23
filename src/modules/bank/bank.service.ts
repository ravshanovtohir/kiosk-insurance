import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import {
  CreateBankRequest,
  FindBankResponse,
  UpdateBankRequest,
  BankModel,
  FindOneBankResponse,
  DeleteRequestResponse,
} from '@interfaces'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { Pagination, RegionStatus, RegionStatusOutPut } from '@enums'

@Injectable()
export class BankService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<Omit<FindBankResponse, 'pagination'>> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const banks = await FilterService?.applyFilters('bank', parsedFilters, parsedSort, Number(limit), Number(page), [
      'region',
    ])

    const pagination = paginationResponse(banks.length, limit, page)

    const result: BankModel[] = []

    banks?.map((bank: any) => {
      result.push({
        id: bank?.id,
        name: bank?.name,
        percentage: Number(bank?.percentage),
        region: {
          id: bank?.region?.id,
          name: bank?.region?.name,
          status: {
            int: bank?.region?.status,
            string: RegionStatusOutPut[RegionStatus[bank?.region?.status] as keyof typeof RegionStatusOutPut],
          },
          createdAt: bank?.region?.createdAt,
        },
        createdAt: bank?.createdAt,
      })
    })

    return formatResponse<BankModel[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number): Promise<FindOneBankResponse> {
    const bank = await this.prisma.bank.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        region: true,
      },
    })

    if (!bank) {
      throw new NotFoundException(`Bank not found with given ID`)
    }

    const result: BankModel = {
      id: bank?.id,
      name: bank?.name,
      percentage: Number(bank?.percentage),
      region: {
        id: bank?.region?.id,
        name: bank?.region?.name,
        status: {
          int: bank?.region?.status,
          string: RegionStatusOutPut[RegionStatus[bank?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: bank?.region?.createdAt,
      },
      createdAt: bank?.createdAt,
    }

    return formatResponse<BankModel>(HttpStatus.OK, result)
  }

  async create(data: CreateBankRequest) {
    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: data?.regionId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!regionExists) {
      throw new NotFoundException('Region not found with given ID!')
    }

    const newBank = await this.prisma.bank.create({
      data: {
        name: data?.name,
        regionId: data?.regionId,
        percentage: data?.percentage,
      },
      include: {
        region: true,
      },
    })

    const result: BankModel = {
      id: newBank?.id,
      name: newBank?.name,
      percentage: Number(newBank?.percentage),
      region: {
        id: newBank?.region?.id,
        name: newBank?.region?.name,
        status: {
          int: newBank?.region?.status,
          string: RegionStatusOutPut[RegionStatus[newBank?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: newBank?.region?.createdAt,
      },
      createdAt: newBank?.createdAt,
    }

    return formatResponse<BankModel>(HttpStatus.CREATED, result)
  }

  async update(id: number, data: UpdateBankRequest) {
    const bankExists = await this.prisma.bank.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!bankExists) {
      throw new NotFoundException(`Bank not found with given ID`)
    }

    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: data?.regionId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (data.regionId && !regionExists) {
      throw new NotFoundException('Region not found with given ID!')
    }

    const updatedBank = await this.prisma.bank.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        region: true,
      },
    })

    const result: BankModel = {
      id: updatedBank?.id,
      name: updatedBank?.name,
      percentage: Number(updatedBank?.percentage),
      region: {
        id: updatedBank?.region?.id,
        name: updatedBank?.region?.name,
        status: {
          int: updatedBank?.region?.status,
          string: RegionStatusOutPut[RegionStatus[updatedBank?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: updatedBank?.region?.createdAt,
      },
      createdAt: updatedBank?.createdAt,
    }

    return formatResponse<BankModel>(HttpStatus.OK, result)
  }

  async remove(id: number): Promise<DeleteRequestResponse> {
    const bankExists = await this.prisma.bank.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!bankExists) {
      throw new NotFoundException(`Bank not found with given ID!`)
    }

    await this.prisma.bank.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return {
      status: HttpStatus.NO_CONTENT,
    }
  }
}
