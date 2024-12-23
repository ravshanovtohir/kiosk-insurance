import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateStructureRequest, UpdateStructureRequest, StructureResponse, DeleteRequestResponse } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { HttpStatus, Pagination, RegionStatus, RegionStatusOutPut, StructureEnum, StructureEnumOutPut } from '@enums'

@Injectable()
export class StructureService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const structures = await FilterService?.applyFilters(
      'structure',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['region'],
    )

    const result: StructureResponse[] = []

    structures.map((structure: any) => {
      result.push({
        id: structure?.id,
        name: structure?.name,
        status: {
          int: structure?.status,
          string: StructureEnumOutPut[StructureEnum[structure.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: structure?.createdAt,
        region: {
          id: structure?.region?.id,
          name: structure?.region?.name,
          status: {
            int: structure?.region?.status,
            string: RegionStatusOutPut[RegionStatus[structure?.region?.status] as keyof typeof RegionStatusOutPut],
          },
          createdAt: structure?.region?.createdAt,
        },
      })
    })

    const pagination = paginationResponse(structures.length, limit, page)

    return formatResponse<StructureResponse[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const structure = await this.prisma.structure.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        region: true,
      },
    })

    if (!structure) {
      throw new NotFoundException('Structure not found with given ID!')
    }

    const result: StructureResponse = {
      id: structure?.id,
      name: structure?.name,
      status: {
        int: structure?.status,
        string: StructureEnumOutPut[StructureEnum[structure.status] as keyof typeof StructureEnumOutPut],
      },
      createdAt: structure?.createdAt,
      region: {
        id: structure?.region.id,
        name: structure?.region?.name,
        status: {
          int: structure?.status,
          string: RegionStatusOutPut[RegionStatus[structure?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: structure?.createdAt,
      },
    }

    return formatResponse<StructureResponse>(HttpStatus.OK, result)
  }

  async create(data: CreateStructureRequest) {
    const structureNameExists = await this.prisma.structure.findFirst({
      where: {
        name: data?.name,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (structureNameExists) {
      throw new ConflictException('Structure exists with given name!')
    }

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

    const newStrucutre = await this.prisma.structure.create({
      data: {
        name: data.name,
        status: data.status,
        regionId: data.regionId,
      },
      include: {
        region: true,
      },
    })

    const result: StructureResponse = {
      id: newStrucutre?.id,
      name: newStrucutre?.name,
      status: {
        int: newStrucutre?.status,
        string: StructureEnumOutPut[StructureEnum[newStrucutre.status] as keyof typeof StructureEnumOutPut],
      },
      createdAt: newStrucutre?.createdAt,
      region: {
        id: newStrucutre?.region.id,
        name: newStrucutre?.region?.name,
        status: {
          int: newStrucutre?.status,
          string: RegionStatusOutPut[RegionStatus[newStrucutre?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: newStrucutre?.createdAt,
      },
    }

    return formatResponse<StructureResponse>(HttpStatus?.CREATED, result)
  }

  async update(id: number, data: UpdateStructureRequest) {
    const structureExists = await this.prisma.structure.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    const structureNameExists = await this.prisma.structure.findFirst({
      where: {
        name: data?.name,
      },
    })

    if (!structureExists) {
      throw new NotFoundException('Structure not found with given ID')
    }

    if (data?.name && structureNameExists) {
      throw new ConflictException('Structure exists with this name!')
    }

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

    const updatedStructure = await this.prisma.structure.update({
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

    const result: StructureResponse = {
      id: updatedStructure?.id,
      name: updatedStructure?.name,
      status: {
        int: updatedStructure?.status,
        string: StructureEnumOutPut[StructureEnum[updatedStructure.status] as keyof typeof StructureEnumOutPut],
      },
      createdAt: updatedStructure?.createdAt,
      region: {
        id: updatedStructure?.region.id,
        name: updatedStructure?.region?.name,
        status: {
          int: updatedStructure?.status,
          string: RegionStatusOutPut[RegionStatus[updatedStructure?.region?.status] as keyof typeof RegionStatusOutPut],
        },
        createdAt: updatedStructure?.createdAt,
      },
    }

    return formatResponse<StructureResponse>(HttpStatus?.CREATED, result)
  }

  async remove(id: number): Promise<DeleteRequestResponse> {
    const structureExists = await this.prisma.structure.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!structureExists) {
      throw new NotFoundException('Structure not found with given ID')
    }

    await this.prisma.structure.update({
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
