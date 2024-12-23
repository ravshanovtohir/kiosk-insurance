import { CreateUserRequest, DeleteRequestResponse, UpdateUserRequest, UserResponse } from '@interfaces'
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import {
  UserRoles,
  UserRolesOutPut,
  Pagination,
  HttpStatus,
  UserStatusOutPut,
  UserStatus,
  StructureEnumOutPut,
  StructureEnum,
} from '@enums'
import * as bcrypt from 'bcrypt'
import { addFilter, FilterService, formatResponse, paginationResponse } from '@helpers'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const users: User[] = await FilterService?.applyFilters(
      'user',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['structure'],
    )

    const usersWithRoles: UserResponse[] = users.map((user: any) => ({
      id: user?.id,
      name: user?.name,
      login: user?.login,
      code: user?.code,
      role: {
        int: user?.role,
        string: UserRolesOutPut[UserRoles[user?.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: user?.status,
        string: UserStatusOutPut[UserStatus[user?.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: user?.cashCount,
      fcmToken: user?.fcmToken,
      latitude: user?.latitude,
      longitude: user?.longitude,
      structure: {
        id: user?.structure?.id,
        name: user?.structure?.name,
        status: {
          int: user?.structure?.status,
          string: StructureEnumOutPut[StructureEnum[user?.structure?.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: user?.structure?.createdAt,
      },
      incasatorId: user?.incasatorId,
      createdAt: user?.createdAt,
    }))

    const pagination = paginationResponse(users.length, limit, page)

    return formatResponse<UserResponse[]>(HttpStatus.OK, usersWithRoles, pagination)
  }

  async getOperators(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    parsedFilters.push(addFilter('role', UserRoles.OPERATOR, 'equals'))

    const operators: User[] = await FilterService?.applyFilters(
      'user',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['structure'],
    )

    const operatorsWithRoles: UserResponse[] = operators.map((operator: any) => ({
      id: operator.id,
      name: operator.name,
      login: operator.login,
      code: operator.code,
      role: {
        int: operator.role,
        string: UserRolesOutPut[UserRoles[operator.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: operator.status,
        string: UserStatusOutPut[UserStatus[operator.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: operator.cashCount,
      fcmToken: operator.fcmToken,
      latitude: operator.latitude,
      longitude: operator.longitude,
      structure: {
        id: operator?.structure?.id,
        name: operator?.structure?.name,
        status: {
          int: operator?.structure?.status,
          string: StructureEnumOutPut[StructureEnum[operator?.structure?.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: operator?.structure?.createdAt,
      },
      incasatorId: operator?.incasatorId,
      createdAt: operator?.createdAt,
    }))

    const pagination = paginationResponse(operatorsWithRoles.length, limit, page)
    return formatResponse<UserResponse[]>(HttpStatus.OK, operatorsWithRoles, pagination)
  }

  async getAccountans() {
    const accountants = await this.prisma.user.findMany({
      where: {
        role: UserRoles.ACCOUNTANT,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structure: true,
      },
    })

    const accountantWithRoles: UserResponse[] = accountants.map((accountant: any) => ({
      id: accountant.id,
      name: accountant.name,
      login: accountant.login,
      code: accountant.code,
      role: {
        int: accountant.role,
        string: UserRolesOutPut[UserRoles[accountant.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: accountant.status,
        string: UserStatusOutPut[UserStatus[accountant.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: accountant.cashCount,
      fcmToken: accountant.fcmToken,
      latitude: accountant.latitude,
      longitude: accountant.longitude,
      structure: {
        id: accountant?.structure?.id,
        name: accountant?.structure?.name,
        status: {
          int: accountant.structure.status,
          string: StructureEnumOutPut[StructureEnum[accountant.structure.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: accountant.structure.createdAt,
      },
      incasatorId: accountant.incasatorId,
      createdAt: accountant.createdAt,
    }))

    return formatResponse<UserResponse[]>(HttpStatus.OK, accountantWithRoles)
  }

  async getIncasators() {
    const incasators = await this.prisma.user.findMany({
      where: {
        role: UserRoles.INCASATOR,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structure: true,
      },
    })

    type UserResponseWithoutIncasatorId = Omit<UserResponse, 'incasatorId'>

    const incasatorsWithRoles: UserResponseWithoutIncasatorId[] = incasators.map((incasator: any) => ({
      id: incasator.id,
      name: incasator.name,
      login: incasator.login,
      code: incasator.code,
      role: {
        int: incasator.role,
        string: UserRolesOutPut[UserRoles[incasator.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: incasator.status,
        string: UserStatusOutPut[UserStatus[incasator.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: incasator.cashCount,
      fcmToken: incasator.fcmToken,
      latitude: incasator.latitude,
      longitude: incasator.longitude,
      structure: {
        id: incasator?.structure?.id,
        name: incasator?.structure?.name,
        status: {
          int: incasator.structure.status,
          string: StructureEnumOutPut[StructureEnum[incasator.structure.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: incasator.structure.createdAt,
      },
      createdAt: incasator.createdAt,
    }))

    return formatResponse<UserResponseWithoutIncasatorId[]>(HttpStatus.OK, incasatorsWithRoles)
  }

  async getOperatorsStatic(userId: number) {
    const operators = await this.prisma.user.findMany({
      where: {
        incasatorId: userId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structure: true,
      },
    })

    const result: UserResponse[] = operators?.map((operator: any) => ({
      id: operator?.id,
      name: operator?.name,
      login: operator?.login,
      code: operator?.code,
      role: {
        int: operator?.role,
        string: UserRolesOutPut[UserRoles[operator?.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: operator?.status,
        string: UserStatusOutPut[UserStatus[operator?.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: operator?.cashCount,
      fcmToken: operator?.fcmToken,
      latitude: operator?.latitude,
      longitude: operator?.longitude,
      structure: {
        id: operator?.structure?.id,
        name: operator?.structure?.name,
        status: {
          int: operator?.structure?.status,
          string: StructureEnumOutPut[StructureEnum[operator?.structure?.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: operator?.structure?.createdAt,
      },
      incasatorId: operator?.incasatorId,
      createdAt: operator?.createdAt,
    }))

    return formatResponse<UserResponse[]>(HttpStatus.OK, result)
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        structure: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found with given ID')
    }

    const result = {
      id: user?.id,
      name: user?.name,
      login: user?.login,
      code: user?.code,
      role: {
        int: user?.role,
        string: UserRolesOutPut[UserRoles[user?.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: user?.status,
        string: UserStatusOutPut[UserStatus[user?.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: user?.cashCount,
      fcmToken: user?.fcmToken,
      latitude: user?.latitude.toString(),
      longitude: user?.longitude.toString(),
      structure: {
        id: user?.structure?.id,
        name: user?.structure?.name,
        status: {
          int: user?.structure?.status,
          string: StructureEnumOutPut[StructureEnum[user?.structure?.status] as keyof typeof StructureEnumOutPut],
        },
        createdAt: user?.structure?.createdAt,
      },
      incasatorId: user?.incasatorId,
      createdAt: user?.createdAt,
    }

    return formatResponse<UserResponse>(HttpStatus.CREATED, result)
  }

  async create(data: CreateUserRequest) {
    const saltOrRounds = 10

    const userExists = await this.prisma.user.findFirst({
      where: {
        login: data?.login,
      },
    })

    if (userExists) {
      throw new ConflictException('This login already in use!')
    }

    if (data.login.length > 15) {
      throw new BadRequestException('Login must be less than 15 characters')
    }

    if (data.login.length < 8) {
      throw new BadRequestException('Login must be more than 8 characters')
    }

    if (data.password.length > 12) {
      throw new BadRequestException('Password must be less than 12 characters')
    }

    if (data.password.length < 6) {
      throw new BadRequestException('Password must be more than 6 characters')
    }

    if (!Object.values(UserRoles).includes(data.role)) {
      throw new NotFoundException('Role not found!')
    }

    const count = await this.prisma.user.count({
      where: {
        role: data.role,
      },
    })

    const roleKey = Object.keys(UserRoles).find((key) => UserRoles[key as keyof typeof UserRoles] === data.role)

    const roleCapitalLetter = roleKey?.substring(0, 2).toUpperCase()

    const code = `${roleCapitalLetter}${count + 1}`

    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds)

    const newUser = await this.prisma.user.create({
      data: {
        name: data?.name,
        login: data?.login,
        password: hashedPassword,
        code: code,
        role: data?.role,
        incasatorId: data?.incasatorId,
        longitude: data?.longitude,
        latitude: data?.latitude,
      },
      include: {
        structure: true,
      },
    })

    await this.prisma.userBalance.create({
      data: {
        userId: newUser.id,
        balance: 0,
      },
    })

    const result = {
      id: newUser.id,
      name: newUser.name,
      login: newUser.login,
      code: newUser.code,
      role: {
        int: newUser.role,
        string: UserRolesOutPut[UserRoles[newUser.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: newUser.status,
        string: UserStatusOutPut[UserStatus[newUser.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: newUser.cashCount,
      fcmToken: newUser.fcmToken,
      latitude: newUser.latitude.toString(),
      longitude: newUser.longitude.toString(),
      incasatorId: newUser.incasatorId,
      structureId: newUser.structureId,
      createdAt: newUser.createdAt,
    }

    return formatResponse(HttpStatus.CREATED, result)
  }

  async update(id: number, data: UpdateUserRequest) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!userExists) {
      throw new NotFoundException('User not found with given ID!')
    }

    if (data.login && data.login.length > 15) {
      throw new BadRequestException('Login must be less than 15 characters!')
    }

    if (data.login && data.login.length < 8) {
      throw new BadRequestException('Login must be more than 8 characters!')
    }

    if (data.password && data.password.length > 12) {
      throw new BadRequestException('Password must be less than 12 characters!')
    }

    if (data.password && data.password.length < 6) {
      throw new BadRequestException('Password must be more than 6 characters!')
    }

    if (data.role && !Object.values(UserRoles).includes(data.role as UserRoles)) {
      throw new NotFoundException('Role not found!')
    }

    if (data.login && data.login !== userExists.login) {
      const loginTaken = await this.prisma.user.findFirst({
        where: {
          login: data.login,
          id: {
            not: id,
          },
          deletedAt: {
            equals: null,
          },
        },
      })

      if (loginTaken) {
        throw new ConflictException('This login already in use by another user!')
      }
    }

    let hashedPassword = userExists.password
    if (data.password) {
      const saltOrRounds = 10
      hashedPassword = await bcrypt.hash(data.password, saltOrRounds)
    }

    let code = userExists.code
    if (data.role && data.role !== userExists.role) {
      const count = await this.prisma.user.count({
        where: {
          role: data.role,
          deletedAt: {
            equals: null,
          },
        },
      })

      const role = UserRoles[data.role]

      const roleCapitalLetter = role
        .split('_')
        .map((c: string, index: number, array: string[]) => {
          if (array.length > 1) {
            return c.charAt(0).toLocaleUpperCase()
          } else {
            return c.charAt(0).toLocaleUpperCase() + c.charAt(1).toLocaleUpperCase()
          }
        })
        .join('')

      code = `${roleCapitalLetter}${count + 1}`
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        name: data?.name || userExists.name,
        login: data?.login || userExists.login,
        password: hashedPassword,
        code: code,
        role: data?.role || userExists.role,
        incasatorId: data?.incasatorId || userExists?.incasatorId,
        latitude: data?.latitude || userExists?.latitude,
        longitude: data?.longitude || userExists?.longitude,
        structureId: data?.structureId,
        updatedAt: new Date(),
      },
    })

    const result = {
      id: updatedUser.id,
      name: updatedUser.name,
      login: updatedUser.login,
      code: updatedUser.code,
      role: {
        int: updatedUser.role,
        string: UserRolesOutPut[UserRoles[updatedUser.role] as keyof typeof UserRolesOutPut],
      },
      status: {
        int: updatedUser.status,
        string: UserStatusOutPut[UserStatus[updatedUser.status] as keyof typeof UserStatusOutPut],
      },
      cashCount: updatedUser.cashCount,
      fcmToken: updatedUser.fcmToken,
      latitude: updatedUser.latitude.toString(),
      longitude: updatedUser.longitude.toString(),
      incasatorId: updatedUser.incasatorId,
      structureId: updatedUser.structureId,
      createdAt: updatedUser.createdAt,
    }
    return formatResponse(HttpStatus.OK, result)
  }

  async delete(id: number): Promise<DeleteRequestResponse> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!userExists) {
      throw new NotFoundException('User not found with given ID!')
    }

    await this.prisma.user.update({
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

  async validate(data: any) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: data.login,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('User does not exist')
    }

    return {
      id: user?.id,
      login: user?.login,
      password: user?.password,
    }
  }
}
