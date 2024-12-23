import { HttpStatus, Pagination, PartnerStatus, PartnerStatusOutPut } from '@enums'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import {
  Companies,
  CreatePartnerRequest,
  CreatePartnerResponse,
  FindActivePartners,
  FindOnePartnerResponse,
  PartnerModel,
  UpdatePartnerRequest,
  UpdatePartnerResponse,
} from '@interfaces'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Partner } from '@prisma/client'
import { FindAllPartnerResponse } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
export { PartnerStatus, PartnerStatusOutPut } from '@enums'

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<FindAllPartnerResponse> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const partners: Partner[] = await FilterService?.applyFilters(
      'partner',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
    )

    const pagination = paginationResponse(partners.length, limit, page)

    const result: PartnerModel[] = []

    partners?.map((partner) => {
      result?.push({
        id: partner?.id,
        name: partner?.name,
        partnerId: partner?.partnerId,
        image: partner?.image,
        status: {
          int: partner?.status,
          string: PartnerStatusOutPut[PartnerStatus[partner.status] as keyof typeof PartnerStatusOutPut],
        },
        unLimitedAmountTashkent: partner?.unLimitedAmountTashkent,
        limitedAmountTashkent: partner?.limitedAmountTashkent,
        unLimitedAmountInRegion: partner?.unLimitedAmountInRegion,
        limitedAmountInRegion: partner?.limitedAmountInRegion,
        createdAt: partner?.createdAt,
      })
    })

    return formatResponse(HttpStatus.OK, result, pagination)
  }

  async getCompanies(): Promise<FindActivePartners> {
    const companies = await this.prisma.partner.findMany({
      where: {
        status: PartnerStatus.ACTIVE,
        deletedAt: {
          equals: null,
        },
      },
    })

    const result: Companies[] = []

    companies?.map((company) => {
      result?.push({
        name: company?.name,
        company_id: company?.partnerId,
        image: company?.image,
      })
    })

    return {
      jsonrpc: '2.0',
      result: result,
    }
  }

  async findOne(id: number): Promise<FindOnePartnerResponse> {
    const partner = await this.prisma.partner.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!partner) {
      throw new NotFoundException('Partner not found with given ID!')
    }

    const result: PartnerModel = {
      id: partner?.id,
      name: partner?.name,
      partnerId: partner?.partnerId,
      image: partner?.image,
      status: {
        int: partner?.status,
        string: PartnerStatusOutPut[PartnerStatus[partner.status] as keyof typeof PartnerStatusOutPut],
      },
      unLimitedAmountTashkent: partner?.unLimitedAmountTashkent,
      limitedAmountTashkent: partner?.limitedAmountTashkent,
      unLimitedAmountInRegion: partner?.unLimitedAmountInRegion,
      limitedAmountInRegion: partner?.limitedAmountInRegion,
      createdAt: partner?.createdAt,
    }

    return formatResponse(HttpStatus.OK, result)
  }

  async create(data: CreatePartnerRequest, file: Express.Multer.File): Promise<CreatePartnerResponse> {
    const partnerNameExists = await this.prisma.partner.findFirst({
      where: {
        name: data?.name,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (partnerNameExists) {
      throw new ConflictException('This Partner Name Already exists!')
    }

    const newPartner = await this.prisma.partner.create({
      data: {
        name: data.name,
        partnerId: data.partnerId,
        limitedAmountTashkent: data.limitedAmountTashkent,
        unLimitedAmountTashkent: data.unLimitedAmountTashkent,
        limitedAmountInRegion: data.limitedAmountInRegion,
        unLimitedAmountInRegion: data.unLimitedAmountInRegion,
        image: file.filename,
      },
    })

    const result: PartnerModel = {
      id: newPartner?.id,
      name: newPartner?.name,
      partnerId: newPartner?.partnerId,
      image: newPartner?.image,
      status: {
        int: newPartner?.status,
        string: PartnerStatusOutPut[PartnerStatus[newPartner.status] as keyof typeof PartnerStatusOutPut],
      },
      unLimitedAmountTashkent: newPartner?.unLimitedAmountTashkent,
      limitedAmountTashkent: newPartner?.limitedAmountTashkent,
      unLimitedAmountInRegion: newPartner?.unLimitedAmountInRegion,
      limitedAmountInRegion: newPartner?.limitedAmountInRegion,
      createdAt: newPartner?.createdAt,
    }

    return formatResponse(HttpStatus.CREATED, result)
  }

  async updatePartnerStatus(id: number, status: number): Promise<FindOnePartnerResponse> {
    const partnerExists = await this.prisma.partner.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!partnerExists) {
      throw new NotFoundException('Partner not found with given ID!')
    }

    if (partnerExists.status === status) {
      const statusOutput = PartnerStatusOutPut[PartnerStatus[partnerExists.status] as keyof typeof PartnerStatusOutPut]
      throw new ConflictException(`Partner already is ${statusOutput}`)
    }

    const updatedPartner = await this.prisma.partner.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        updatedAt: new Date(),
        status: status,
      },
    })

    const result: PartnerModel = {
      id: updatedPartner?.id,
      name: updatedPartner?.name,
      partnerId: updatedPartner?.partnerId,
      image: updatedPartner?.image,
      status: {
        int: updatedPartner?.status,
        string: PartnerStatusOutPut[PartnerStatus[updatedPartner.status] as keyof typeof PartnerStatusOutPut],
      },
      unLimitedAmountTashkent: updatedPartner?.unLimitedAmountTashkent,
      limitedAmountTashkent: updatedPartner?.limitedAmountTashkent,
      unLimitedAmountInRegion: updatedPartner?.unLimitedAmountInRegion,
      limitedAmountInRegion: updatedPartner?.limitedAmountInRegion,
      createdAt: updatedPartner?.createdAt,
    }

    return formatResponse(HttpStatus.OK, result)
  }

  async update(id: number, data: UpdatePartnerRequest, file: Express.Multer.File): Promise<void> {
    const existingPartner = await this.prisma.partner.findUnique({
      where: {
        id: id,
      },
    })

    await this.prisma.partner.update({
      where: {
        id: id,
      },
      data: {
        partnerId: data.partnerId,
      },
    })

    // if (!existingPartner) {
    //   throw new NotFoundException('Partner not found')
    // }

    // if (data.name && data.name !== existingPartner.name) {
    //   const partnerNameExists = await this.prisma.partner.findFirst({
    //     where: {
    //       name: data.name,
    //       deletedAt: { equals: null },
    //       id: { not: id },
    //     },
    //   })

    //   if (partnerNameExists) {
    //     throw new ConflictException('Another Partner with this name already exists!')
    //   }
    // }

    // const updateData = {
    //   ...data,
    //   ...(file && { image: file.filename }),
    // }
    // console.log(updateData);

    // const updatedPartner = await this.prisma.partner.update({
    //   where: { id },
    //   data: {
    //     ...updateData,
    //     partnerId: data.partnerId
    //   },
    // })

    // const result: PartnerModel = {
    //   id: updatedPartner.id,
    //   name: updatedPartner.name,
    //   partnerId: updatedPartner.partnerId,
    //   image: updatedPartner?.image,
    //   status: {
    //     int: updatedPartner.status,
    //     string: PartnerStatusOutPut[PartnerStatus[updatedPartner.status] as keyof typeof PartnerStatusOutPut],
    //   },
    //   unLimitedAmountTashkent: updatedPartner.unLimitedAmountTashkent,
    //   limitedAmountTashkent: updatedPartner.limitedAmountTashkent,
    //   unLimitedAmountInRegion: updatedPartner.unLimitedAmountInRegion,
    //   limitedAmountInRegion: updatedPartner.limitedAmountInRegion,
    //   createdAt: updatedPartner.createdAt,
    // }

    // return formatResponse(HttpStatus.OK, result)
  }

  async remove(id: number): Promise<any> {
    const partnerExists = await this.prisma.partner.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!partnerExists) {
      throw new NotFoundException('Partner Not Found with given ID!')
    }

    await this.prisma.partner.update({
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
