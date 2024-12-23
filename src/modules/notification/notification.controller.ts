import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateNotificationDTO } from './dto'
import { CustomRequest } from 'custom'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Notification Service')
@Controller({
  version: '1',
  path: 'notifications',
})
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Get()
  findAll(@Query() query: any) {
    return this.notificationService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.INCASATOR] })
  @Get('static')
  findStaticNotification(@Query() query: any, @Req() request: CustomRequest) {
    return this.notificationService.findStaticNotifications(query, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Post()
  create(@Body() data: CreateNotificationDTO) {
    return this.notificationService.create(data)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Post('for-all-incasator')
  createNotificationForAllincasator(data: Omit<CreateNotificationDTO, 'userId'>) {
    return this.notificationService.sendNotificationAllUser(data)
  }
}
