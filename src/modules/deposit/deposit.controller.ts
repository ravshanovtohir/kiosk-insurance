import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { DepositService } from './deposit.service'
import { CreateDepositDTO, UpdateFcmTokenDTO } from './dto'
import { ApiTags } from '@nestjs/swagger'
import { CheckTokenGuard } from 'guards'
import { CustomRequest } from 'custom'
import { QueryParams } from '@interfaces'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Deposits Service')
@Controller({
  version: '1',
  path: 'deposits',
})
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  findAll(@Query() query: QueryParams) {
    return this.depositService.findAll(query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.INCASATOR] })
  @Get('deposit-static')
  findIncasatorDeposit(@Req() request: CustomRequest, @Query() query: any) {
    return this.depositService.findDepositStatic(request?.user?.id, query)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositService.findOne(+id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.INCASATOR] })
  @Post()
  create(@Body() createDepositDto: CreateDepositDTO, @Req() request: CustomRequest) {
    return this.depositService.create(createDepositDto, request?.user?.id)
  }

  @Post('notify')
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.ACCOUNTANT] })
  sendNotification(@Body() dto: any) {
    return this.depositService.sendNotification(dto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.INCASATOR] })
  @Post(':id')
  @UseInterceptors(
    FileInterceptor('chekPhoto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uuid = uuidv4()
          const filename = `${uuid}-${file.originalname.replace(/\s+/g, '')}`
          cb(null, filename)
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Req() request: CustomRequest,
    @Body() updateDepositDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.depositService.update(+id, request?.user?.id, updateDepositDto, file)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.INCASATOR] })
  @Post('update/fcm-token')
  updateFcmToken(@Body() body: UpdateFcmTokenDTO, @Req() request: CustomRequest) {
    return this.depositService.updateFcmToken(body, request?.user?.id)
  }

  @Patch('status-update/:id')
  @Roles({ role: [UserRoles.ACCOUNTANT] })
  updateAccountant(@Param('id') id: number, @Body() dto: any) {
    return this.depositService.updateDepositAccountant(+id, dto)
  }

  @Delete(':id')
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN] })
  remove(@Param('id') id: string) {
    return this.depositService.remove(+id)
  }
}
