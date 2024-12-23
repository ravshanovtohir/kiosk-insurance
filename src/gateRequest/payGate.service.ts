import { Injectable } from '@nestjs/common'
import { InfinityRequestService } from './request.service'
import { MethodList } from '@enums'

@Injectable()
export class PayGate extends InfinityRequestService {
  async prepareToPay(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_CHECK)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async preparePayByCard(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_PREPARE_PAYMENT)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async confirmPayment(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_CONFIRM_PAYMENT)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async resendSms(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_RESEND_SMS)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async checkTransactionStatus(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_CHECK_PAYMENT_STATUS)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async getFiscalDetails(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_GET_FISCAL_DETAILS)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }

  async payByCash(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_PAY_BY_CASH)
      .setUrl(process.env.PAYMENT_URL)
      .setParams(data)
      .send()
  }
}
