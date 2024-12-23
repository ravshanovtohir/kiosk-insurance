import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateRegionRequest, DeleteRequestResponse, Region, UpdateRegionRequest } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { HttpStatus, Pagination, RegionStatus, RegionStatusOutPut, StructureEnum, StructureEnumOutPut } from '@enums'
@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const regions = await FilterService?.applyFilters(
      'region',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['structures'],
    )

    const result: Region[] = []

    for (const region of regions) {
      result?.push({
        id: region?.id,
        name: region?.name,
        status: {
          int: region?.status,
          string: RegionStatusOutPut[RegionStatus[region.status] as keyof typeof RegionStatusOutPut],
        },
        structures: region?.structures?.map((structure: any) => ({
          id: structure?.id,
          name: structure?.name,
          status: {
            int: structure?.status,
            string: StructureEnumOutPut[StructureEnum[structure.status] as keyof typeof StructureEnumOutPut],
          },
          createdAt: structure?.createdAt,
        })),

        createdAt: region?.createdAt,
      })
    }

    const pagination = paginationResponse(regions.length, limit, page)

    return formatResponse<any>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const region = await this.prisma.region.findFirst({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structures: true,
      },
    })

    if (!region) {
      throw new NotFoundException('Region not found with this ID!')
    }

    const result: Region = {
      id: region?.id,
      name: region?.name,
      status: {
        int: region?.status,
        string: RegionStatusOutPut[RegionStatus[region.status] as keyof typeof RegionStatusOutPut],
      },
      structures: region?.structures?.map((structure: any) => ({
        id: structure?.id,
        name: structure?.name,
        status: {
          int: structure?.status,
          string: StructureEnumOutPut[StructureEnum[structure.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: structure?.createdAt,
      })),

      createdAt: region?.createdAt,
    }

    return formatResponse<Region>(HttpStatus.OK, result)
  }

  async create(data: CreateRegionRequest) {
    const regionExists = await this.prisma.region.findFirst({
      where: {
        name: data?.name,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (regionExists) {
      throw new ConflictException('Region exists with this name!')
    }

    const newRegion = await this.prisma.region.create({
      data: data,
    })

    const result: Region = {
      id: newRegion?.id,
      name: newRegion?.name,
      status: {
        int: newRegion?.status,
        string: RegionStatusOutPut[RegionStatus[newRegion?.status] as keyof typeof RegionStatusOutPut],
      },
      createdAt: newRegion?.createdAt,
    }

    return formatResponse<Region>(HttpStatus.OK, result)
  }

  async update(id: number, data: UpdateRegionRequest) {
    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    const regionNameExists = await this.prisma.region.findFirst({
      where: {
        name: data?.name,
      },
    })

    if (!regionExists) {
      throw new NotFoundException('Region not found with given ID')
    }

    if (regionNameExists) {
      throw new ConflictException('Region exists with this name!')
    }

    const updatedRegion = await this.prisma.region.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    const result: Region = {
      id: updatedRegion?.id,
      name: updatedRegion?.name,
      status: {
        int: updatedRegion?.status,
        string: RegionStatusOutPut[RegionStatus[updatedRegion?.status] as keyof typeof RegionStatusOutPut],
      },
      createdAt: updatedRegion?.createdAt,
    }
    return formatResponse<Region>(HttpStatus.OK, result)
  }

  async remove(id: number): Promise<DeleteRequestResponse> {
    const regionExists = await this.prisma.region.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!regionExists) {
      throw new NotFoundException('Region not found with given ID')
    }

    await this.prisma.region.update({
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
