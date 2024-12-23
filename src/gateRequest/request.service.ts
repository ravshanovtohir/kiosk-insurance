import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import * as crypto from 'crypto'
import { REQUEST_ERRORS } from '@enums'
import { GetInsuranceIds, TransactionPreparePayCardResponse } from '@interfaces'

@Injectable()
export class InfinityRequestService {
  private response: any
  private method: string
  private params: any
  private errorUnknown: any
  private serviceKey: string
  private serviceId: string
  private url: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async send() {
    const jsonPayload = this.getRequest()

    const url = this.getUrl()
    const authHeader = this.generateForAuth()

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, jsonPayload, {
          headers: {
            'Content-Type': 'application/json',
            'Auth': authHeader,
          },
          timeout: 30000,
        }),
      )

      this.setResponse(response.data)

      // if (this.isOk() === false) {
      //   throw new InternalServerErrorException(this.getError())
      // }

      if (!this.response) {
        this.setErrorUnknown({
          code: REQUEST_ERRORS.INVALID_ANSWER,
          message: REQUEST_ERRORS.UNKNOWN_RESPONSE_ERROR,
        })
      }

      return this
    } catch (error: any) {
      console.log(error)
      throw new InternalServerErrorException(this.getError())
    }
  }

  setParams(params: any): InfinityRequestService {
    this.params = params
    return this
  }

  setServiceKey(params: string): InfinityRequestService {
    this.serviceKey = params
    return this
  }

  setServiceId(params: string): InfinityRequestService {
    this.serviceId = params
    return this
  }

  setUrl(params: string): InfinityRequestService {
    this.url = params
    return this
  }

  setResponse(response: any) {
    this.response = response
    // return this
  }

  setErrorUnknown(error: any) {
    this.errorUnknown = error
  }

  getParams(): any {
    return this.params || {}
  }

  getUrl(): any {
    return this.url || ''
  }

  setMethod(method: string): InfinityRequestService {
    this.method = method
    return this
  }

  getMethod(): string {
    return this.method || null
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000)
  }

  private generateForAuth(): string {
    const timestamp = Date.now()

    const hash = crypto
      .createHash('sha1')
      .update(this.serviceKey + timestamp)
      .digest('hex')

    const authHeader = `${this.serviceId}-${hash}-${timestamp}`

    return authHeader
  }

  getResponse(): any {
    return this.response || {}
  }

  getResult(): any {
    return this.response?.result || []
  }

  getIdsPreparePayCard(): TransactionPreparePayCardResponse {
    const result = {
      id: this.response.result.details.id,
      transaction_id: this.response.result.details.transaction_id,
      bank_transaction_id: this.response.result.details.bank_transaction_id,
      reference_number: this.response.result.details.reference_number,
      amount: this.response.result.details.amount,
      merchantId: this.response.result.details.merchantId,
      terminalId: this.response.result.details.terurlminalId,
    }
    return result
  }

  getInsuranceIds(): GetInsuranceIds {
    const result = {
      id: this?.response?.result?.id,
      order_id: this?.response?.result?.order_id,
      anketa_id: this?.response?.result?.anketa_id,
      polis_id: this?.response?.result?.polis_id,
      vendor_id: this?.response?.result?.pay?.params?.vendor_id,
    }
    return result
  }

  getError(): any {
    return this.response?.error?.message || this?.errorUnknown
  }

  getErrorUnknown(): any {
    return this.errorUnknown || { message: 'Unknown error' }
  }

  isOk(): boolean {
    return !this.getError()
  }

  getResultSms(): any {
    const confirmSms = this.getResult()?.confirm_form || []

    if (!confirmSms || !Array.isArray(confirmSms)) {
      throw new Error('confirm_form is not an array or is undefined.')
    }

    const foundItem = confirmSms.find((item) => item?.key === 'transaction_id')
    return foundItem ? foundItem.value : null
  }

  getResultCheckPay(): any {
    const result = this.getResult() || []

    if (!result || !Array.isArray(result)) {
      throw new Error('Result is not an array or is undefined.')
    }

    const foundItem = result.find((item) => item?.request_method === 'pam.prepare_pay')
    return foundItem || null
  }

  getDetails(): any {
    return this.response?.result?.details || []
  }

  getRequest(): any {
    return {
      jsonrpc: '2.0',
      id: this.generateId(),
      method: this.getMethod(),
      params: this.getParams(),
    }
  }
}
