import { HttpStatus, NotificationType, NotificationTypeOutPut, Pagination, UserRoles } from '@enums'
import { FilterService, formatResponse, paginationResponse, FirebaseService, addFilter } from '@helpers'
import { CreateNotificationRequest, NotificationResponse } from '@interfaces'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Notify } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
  ) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const notifications: Notify[] = await FilterService?.applyFilters(
      'notify',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['user'],
    )

    const result: NotificationResponse[] = []

    notifications.map((notification) => {
      result.push({
        id: notification?.id,
        title: notification?.title,
        content: notification?.content,
        userId: notification?.userId,
        type: {
          int: notification?.type,
          string: NotificationTypeOutPut[NotificationType[notification.type] as keyof typeof NotificationTypeOutPut],
        },
        createdAt: notification?.createdAt,
      })
    })

    const pagination = paginationResponse(notifications.length, limit, page)

    return formatResponse<NotificationResponse[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const notification = await this.prisma.notify.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!notification) {
      throw new NotFoundException('Notification not found with given ID!')
    }

    const result: NotificationResponse = {
      id: notification?.id,
      title: notification?.title,
      content: notification?.content,
      userId: notification?.userId,
      type: {
        int: notification?.type,
        string: NotificationTypeOutPut[NotificationType[notification.type] as keyof typeof NotificationTypeOutPut],
      },
      createdAt: notification?.createdAt,
    }

    return formatResponse<NotificationResponse>(HttpStatus.OK, result)
  }

  async findStaticNotifications(query: any, userId: number) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    parsedFilters.push(addFilter('userId', userId, 'equals'))

    const notifications: Notify[] = await FilterService?.applyFilters(
      'notify',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['user'],
    )

    const result: NotificationResponse[] = []

    notifications.map((notification) => {
      result.push({
        id: notification?.id,
        title: notification?.title,
        content: notification?.content,
        userId: notification?.userId,
        type: {
          int: notification?.type,
          string: NotificationTypeOutPut[NotificationType[notification.type] as keyof typeof NotificationTypeOutPut],
        },
        createdAt: notification?.createdAt,
      })
    })

    const pagination = paginationResponse(notifications.length, limit, page)
    return formatResponse<NotificationResponse[]>(HttpStatus.OK, result, pagination)
  }

  async create(data: CreateNotificationRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
        role: UserRoles.INCASATOR,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('User not found with given ID!')
    }

    const firebaseToken = user.fcmToken

    if (!firebaseToken) {
      throw new NotFoundException('FCM Token not found')
    }

    const newNotification = await this.prisma.notify.create({
      data: {
        type: data.type,
        title: data.title,
        content: data.title,
        userId: data.userId,
      },
    })

    const result: NotificationResponse = {
      id: newNotification?.id,
      title: newNotification?.title,
      content: newNotification?.content,
      userId: newNotification?.userId,
      type: {
        int: newNotification?.type,
        string: NotificationTypeOutPut[NotificationType[newNotification.type] as keyof typeof NotificationTypeOutPut],
      },
      createdAt: newNotification?.createdAt,
    }
    await this.firebase.sendPushNotification(firebaseToken, data?.title, data?.content)

    return formatResponse<NotificationResponse>(HttpStatus.CREATED, result)
  }

  async sendNotificationAllUser(data: Omit<CreateNotificationRequest, 'userId'>) {
    const users = await this.prisma.user.findMany({
      where: {
        role: UserRoles.INCASATOR,
        deletedAt: {
          equals: null,
        },
      },
    })

    for (const user of users) {
      await this.prisma.notify.create({
        data: {
          type: data.type,
          title: data.title,
          content: data.title,
          userId: user.id,
        },
      })
      const fcmToken = user.fcmToken
      await this.firebase.sendPushNotification(fcmToken, data?.title, data?.content)
    }

    return {
      status: HttpStatus.CREATED,
    }
  }
}
