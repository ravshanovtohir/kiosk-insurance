import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { StructureService } from './structure.service'
import { CreateStructureDTO, UpdateStructureDTO } from './dto'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Structure Service')
@Controller({
  version: '1',
  path: 'structures',
})
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get()
  findAll(@Query() query: any) {
    return this.structureService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.structureService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Post()
  create(@Body() createStructureDto: CreateStructureDTO) {
    return this.structureService.create(createStructureDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStructureDto: UpdateStructureDTO) {
    return this.structureService.update(+id, updateStructureDto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.structureService.remove(+id)
  }
}
