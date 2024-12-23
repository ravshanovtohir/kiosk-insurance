import { ApiTags } from '@nestjs/swagger'
import { UserBalanceService } from './user_balance.service'
import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { CustomRequest } from 'custom'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('User Balance Service')
@Controller({
  path: 'user-balance',
  version: '1',
})
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get()
  findAll(@Query() query: any) {
    return this.userBalanceService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR, UserRoles.INCASATOR] })
  @Get('static-balance')
  findStaticBalance(@Req() request: CustomRequest) {
    return this.userBalanceService.findStaticUserBalance(request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBalanceService.findOne(+id)
  }
}
