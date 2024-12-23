import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { HttpStatus, Pagination, VendorType, VendorTypeOutPut } from '@enums'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { Vendor } from '@prisma/client'
import { CreateVendorRequest, DeleteRequestResponse, UpdateVendorRequest, VendorModel } from '@interfaces'

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const vendors: Vendor[] = await FilterService?.applyFilters(
      'vendor',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
    )

    const result: VendorModel[] = []

    vendors?.map((vendor) => {
      result?.push({
        id: vendor?.id,
        title: vendor?.title,
        vendorId: vendor?.vendorId,
        type: {
          int: vendor?.type,
          string: VendorTypeOutPut[VendorType[vendor?.type] as keyof typeof VendorTypeOutPut],
        },
        numberPrefix: vendor?.numberPrefix,
        createdAt: vendor?.createdAt,
      })
    })
    const pagination = paginationResponse(result.length, limit, page)
    return formatResponse(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const vendor: Vendor = await this.prisma.vendor.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!vendor) {
      throw new NotFoundException('Vendor not found with given ID!')
    }

    const result: VendorModel = {
      id: vendor?.id,
      title: vendor?.title,
      vendorId: vendor?.vendorId,
      type: {
        int: vendor?.type,
        string: VendorTypeOutPut[VendorType[vendor?.type] as keyof typeof VendorTypeOutPut],
      },
      numberPrefix: vendor?.numberPrefix,
      createdAt: vendor?.createdAt,
    }

    return formatResponse(HttpStatus.OK, result)
  }

  async create(data: CreateVendorRequest) {
    const existsVendor = await this.prisma.vendor.findFirst({
      where: {
        title: data?.title,
        vendorId: data.vendorId,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (existsVendor) {
      throw new ConflictException('This Vendor name or vendorId already exists!')
    }

    const newVendor: Vendor = await this.prisma.vendor.create({
      data: {
        title: data?.title,
        vendorId: data?.vendorId,
        type: data?.type,
        numberPrefix: data?.numberPrefix || [],
      },
    })

    const result: VendorModel = {
      id: newVendor?.id,
      title: newVendor?.title,
      vendorId: newVendor?.vendorId,
      type: {
        int: newVendor?.type,
        string: VendorTypeOutPut[VendorType[newVendor?.type] as keyof typeof VendorTypeOutPut],
      },
      numberPrefix: newVendor?.numberPrefix,
      createdAt: newVendor?.createdAt,
    }

    return formatResponse(HttpStatus.CREATED, result)
  }

  async update(id: number, data: UpdateVendorRequest) {
    const existsVendor = await this.prisma.vendor.findMany({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!existsVendor) {
      throw new NotFoundException('Vendor not found with given ID!')
    }

    const vendorNameExists = await this.prisma.vendor.findMany({
      where: {
        OR: [{ title: data?.title }, { vendorId: data?.vendorId }],
        deletedAt: {
          equals: null,
        },
      },
    })
    if (vendorNameExists) {
      throw new ConflictException('This Vendor name or vendorId already exists!')
    }

    const updatedVendor: Vendor = await this.prisma.vendor.update({
      where: {
        id: id,
      },
      data: {
        title: data?.title,
        vendorId: data?.vendorId,
        type: data?.type,
        numberPrefix: data?.numberPrefix || [],
        updatedAt: new Date(),
      },
    })

    const result: VendorModel = {
      id: updatedVendor?.id,
      title: updatedVendor?.title,
      vendorId: updatedVendor?.vendorId,
      type: {
        int: updatedVendor?.type,
        string: VendorTypeOutPut[VendorType[updatedVendor?.type] as keyof typeof VendorTypeOutPut],
      },
      numberPrefix: updatedVendor?.numberPrefix,
      createdAt: updatedVendor?.createdAt,
    }

    return formatResponse(HttpStatus.OK, result)
  }

  async remove(id: number): Promise<DeleteRequestResponse> {
    const vendorExists = await this.prisma.vendor.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!vendorExists) {
      throw new NotFoundException('Vendor not found with given ID!')
    }

    await this.prisma.vendor.update({
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
    return {
      status: HttpStatus.NO_CONTENT,
    }
  }
}
