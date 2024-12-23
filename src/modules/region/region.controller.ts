import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { RegionService } from './region.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateRegionDTO, UpdateRegionDTO } from './dto'
import { QueryParams } from '@interfaces'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Region Service')
@Controller({
  version: '1',
  path: 'regions',
})
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get()
  findAll(@Query() query: QueryParams) {
    return this.regionService.findAll(query)
  }

  // @UseGuards(CheckTokenGuard)
  // @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  // @Get('statics')
  // findStatics() {
  //   return this.regionService.findStatics()
  // }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Post()
  create(@Body() createRegionDto: CreateRegionDTO) {
    return this.regionService.create(createRegionDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDTO) {
    return this.regionService.update(+id, updateRegionDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id)
  }
}
