import { InsuranceGateService } from 'gateRequest'
import { Injectable } from '@nestjs/common'
import { CreateInsuranceRequest, GetServiceRequest } from '@interfaces'
import { PrismaService } from 'prisma/prisma.service'
import { InsuranceStatus } from '@enums'

@Injectable()
export class InsuranceService {
  constructor(
    private readonly insuranceGateService: InsuranceGateService,
    private readonly prisma: PrismaService,
  ) {}

  async findCompany() {
    const result = await this.insuranceGateService.findCompany(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
    )
    return result.getResponse()
  }

  async findService(data: GetServiceRequest) {
    const result = await this.insuranceGateService.findService(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      data,
    )
    return result.getResponse()
  }

  async getStep(data: any) {
    const result = await this.insuranceGateService.getStep(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      data,
    )
    return result.getResponse()
  }

  async createInsurance(data: CreateInsuranceRequest, userId: number) {
    const result = await this.insuranceGateService.createInsurance(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      data,
    )

    const { anketa_id, order_id, polis_id, vendor_id, id } = result.getInsuranceIds()

    await this.prisma.insurance.create({
      data: {
        anketaId: anketa_id,
        orderId: order_id,
        request: JSON.stringify(data) || {},
        response: JSON.stringify(result?.getResponse()) || {},
        userId: userId,
        companyId: data.company_id,
        serviceId: data.service_id,
        polisId: polis_id,
        vendorId: vendor_id,
        status: InsuranceStatus.NEW,
        createResId: id,
      },
    })
    return result.getResponse()
  }

  async getPolisUrl(data: any, userId: number) {
    const lastInsurance = await this.prisma.insurance.findFirst({
      where: {
        userId: userId,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const result = await this.insuranceGateService.getPolisUrl(
      process.env.QUICKPAY_SERVICE_ID,
      process.env.QUICKPAY_SERVICE_KEY,
      { id: lastInsurance.createResId },
    )

    return result.getResponse()
  }
}
