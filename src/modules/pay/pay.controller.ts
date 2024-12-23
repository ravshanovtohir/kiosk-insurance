import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'
import { PayService } from './pay.service'
import { ApiTags } from '@nestjs/swagger'
import { CustomRequest } from 'custom'
import { CheckTokenGuard } from 'guards'
import { ConfirmPayDTO, PreparePayCardDTO, PrepareToPayDTO, RefundCashDTO, SaveEveryCashDTO } from './dto'
import { Roles } from '@decorators'
import { UserRoles } from '@enums'

@ApiTags('Pay Service')
@Controller({
  version: '1',
})
export class PayController {
  constructor(private readonly payService: PayService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('check-pay-card')
  payByCard(@Body() prepareToPayDto: PrepareToPayDTO, @Req() request: CustomRequest) {
    return this.payService.preparePay(prepareToPayDto, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('prepare-pay-card')
  preparePay(@Body() preparePayCard: PreparePayCardDTO, @Req() request: CustomRequest) {
    return this.payService.payByCard(preparePayCard, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('confirm-pay-card')
  confirmPayment(@Body() confirmPayDto: ConfirmPayDTO, @Req() request: CustomRequest) {
    return this.payService.confirmPayment(confirmPayDto, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('resend-sms')
  resendSms(@Req() request: CustomRequest) {
    return this.payService.resendSms(request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('check-status-transaction')
  checkTransactionStatus(@Req() request: CustomRequest) {
    return this.payService.checkTransactionStatus(request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('pay-by-cash')
  payByCash(@Req() request: CustomRequest) {
    return this.payService.payByCash(request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-receipt')
  checkReceipt(@Body() dto: any) {
    return this.payService.checkTransactionStatus(dto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-fiscal-details')
  getFiscalDetails(@Body() dto: any) {
    return this.payService.getFiscalData(dto)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('refund-cash')
  refundCash(@Body() refundCashDto: RefundCashDTO, @Req() request: CustomRequest) {
    return this.payService.refundCash(refundCashDto, request?.user?.id)
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('save-cash')
  saveEveryCash(@Body() saveCashDto: any, @Req() request: CustomRequest) {
    return this.payService.saveEveryCash(saveCashDto, request?.user?.id)
  }
}
