import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export class FilterService {
  static async applyFilters(
    modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>,
    filters: Array<{ column: string; operator: string; value: any }>,
    sort: { column: string; value: 'asc' | 'desc' },
    limit?: number,
    page?: number,
    includeRelations: Array<string> = [],
  ): Promise<any> {
    const query: Prisma.UserFindManyArgs = {
      where: {},
      orderBy: {},
      include: {},
    }

    filters.forEach((filter) => {
      if (filter.operator === 'between' && filter.column === 'createdAt') {
        const date = filter.value.split('_')
        if (date.length !== 2) {
          return
        }

        query.where = {
          ...query.where,
          createdAt: {
            gte: new Date(date[0]),
            lte: new Date(date[1]),
          },
        }
      } else if (filter.operator === 'to' && filter.column === 'createdAt') {
        query.where = {
          ...query.where,
          createdAt: {
            lte: new Date(filter.value),
          },
        }
      } else {
        if (filter.value === null || filter.value === '') {
          return
        }

        if (typeof filter.value === 'number' || filter.value == 0) {
          query.where = {
            ...query.where,
            [filter.column]: {
              equals: filter.value,
            },
          }
        } else {
          query.where = {
            ...query.where,
            [filter.column]: {
              contains: filter.value,
              mode: 'insensitive',
            },
          }
        }
      }
    })

    if (sort && sort.column && sort.value) {
      query.orderBy = {
        [sort.column]: sort.value,
      }
    } else {
      query.orderBy = {
        id: 'desc',
      }
    }

    query.where = {
      ...query.where,
      deletedAt: {
        equals: null,
      },
    }

    const skip = (page - 1) * limit

    query.take = limit
    query.skip = skip

    includeRelations.forEach((relation) => {
      ;(query.include as any)[relation] = true
    })

    // includeRelations.forEach((relation) => {
    //   if (relation.includes('.')) {
    //     const [mainRelation, nestedRelation] = relation.split('.')
    //     query.include[mainRelation] = {
    //       include: {
    //         [nestedRelation]: true,
    //       },
    //     }
    //   } else {
    //     query.include[relation] = true
    //   }
    // })

    const model: any = prisma[modelName as keyof PrismaClient]
    return model['findMany'](query)
  }
}
