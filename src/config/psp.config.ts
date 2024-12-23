import { registerAs } from '@nestjs/config'

export declare interface PspConfig {
  url?: string
  serviceId?: string
  paymentUrl: string
  serviceKey?: string
}

export const pspConfig = registerAs<PspConfig>(
  'insurance',
  (): PspConfig => ({
    url: process.env.INSURANCE_URL,
    paymentUrl: process.env.PAYMENT_URL,
    serviceId: process.env.QUICKPAY_SERVICE_ID,
    serviceKey: process.env.QUICKPAY_SERVICE_KEY,
  }),
)
