import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { VendorService } from './vendor.service'
import { CreateVendorDTO, UpdateVendorDTO } from './dto'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Vendors Service')
@Controller({
  version: '1',
  path: 'vendors',
})
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  @Get()
  findAll(@Query() query: any) {
    return this.vendorService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  @Get(':id')
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  @Post()
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  create(@Body() data: CreateVendorDTO) {
    return this.vendorService.create(data)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  @Patch(':id')
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  update(@Param('id') id: string, @Body() data: UpdateVendorDTO) {
    return this.vendorService.update(+id, data)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  @Delete(':id')
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT, UserRoles.OPERATOR] })
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id)
  }
}
