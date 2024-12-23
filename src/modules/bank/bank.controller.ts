import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { BankService } from './bank.service'
import { CreateBankDTO } from './dto'
import { UpdateBankDTO } from './dto/update-bank.dto'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Bank Service')
@Controller({
  version: '1',
  path: 'banks',
})
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Get()
  findAll(@Query() query: any) {
    return this.bankService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Post()
  create(@Body() createBankDto: CreateBankDTO) {
    return this.bankService.create(createBankDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDTO) {
    return this.bankService.update(+id, updateBankDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.INCASATOR] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id)
  }
}
