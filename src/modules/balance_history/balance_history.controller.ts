import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { BalanceHistoryService } from './balance_history.service'
import { ApiTags } from '@nestjs/swagger'
import { CustomRequest } from 'custom'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('User Balance History Service')
@Controller({
  path: 'balance-history',
  version: '1',
})
export class BalanceHistoryController {
  constructor(private readonly balanceHistoryService: BalanceHistoryService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get()
  findAll(@Query() query: any) {
    return this.balanceHistoryService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get('one-user/:id')
  oneUserHistory(@Query() query: any, @Param('id') id: string) {
    return this.balanceHistoryService.findOneUserBalanceHistory(query, +id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR, UserRoles.INCASATOR] })
  @Get('static-history')
  staticBalanceHistory(@Query() query: any, @Req() request: CustomRequest) {
    return this.balanceHistoryService.findStaticUserBalanceHistory(query, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceHistoryService.findOne(+id)
  }
}
