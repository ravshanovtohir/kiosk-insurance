import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InsuranceService } from './insurance.service'
import {
  getServiceRequestDTO,
  getStepRequestDTO,
  stepOneRequestDTO,
  StepTwoRequestDTO,
  StepThreeRequestDTO,
} from './dto'
import { CheckTokenGuard } from 'guards'
import { CustomRequest } from 'custom'
import { Roles } from '@decorators'
import { InsuranceStep, UserRoles } from '@enums'
import { CreateInsuranceRequest } from '@interfaces'
import { formatDate } from '@helpers'

@ApiTags('Company Service')
@Controller({
  version: '1',
})
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-companies')
  async getCompany() {
    const result = await this.insuranceService.findCompany()
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-company-services')
  async getServices(@Body() getServiceDto: getServiceRequestDTO) {
    const result = await this.insuranceService.findService(getServiceDto)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-step')
  async getStep(@Body() getStepDto: getStepRequestDTO) {
    const result = await this.insuranceService.getStep(getStepDto)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-step-one')
  async stepOne(@Body() stepOneDto: stepOneRequestDTO) {
    stepOneDto.step = InsuranceStep.STEPONE
    const result = await this.insuranceService.getStep(stepOneDto)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-step-two')
  async stepTwo(@Body() stepTwoDto: StepTwoRequestDTO) {
    stepTwoDto.step = InsuranceStep.STEPTWO
    stepTwoDto.startDate = formatDate()
    const result = await this.insuranceService.getStep(stepTwoDto)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-step-three')
  async stepThree(@Body() stepThreeDto: StepThreeRequestDTO) {
    stepThreeDto.step = InsuranceStep.STEPTHREE
    const result = await this.insuranceService.getStep(stepThreeDto)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('create-insurance')
  async createInvoice(@Body() createInsuranceDto: CreateInsuranceRequest, @Req() request: CustomRequest) {
    const result = await this.insuranceService.createInsurance(createInsuranceDto, request?.user?.id)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.OPERATOR] })
  @Post('get-polis-url')
  async getPolisUrl(@Body() getPolisUrlDTO: any, @Req() request: CustomRequest) {
    const result = await this.insuranceService.getPolisUrl(getPolisUrlDTO, request.user.id)
    return result
  }
}
