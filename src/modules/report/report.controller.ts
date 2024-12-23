import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ReportService } from './report.service'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Report Service')
@Controller({
  version: '1',
  path: 'report',
})
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get()
  findAll() {
    return this.reportService.findAll()
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get('report-by-region')
  reportByRegion() {
    return this.reportService.reportByRegion()
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id)
  }
}
