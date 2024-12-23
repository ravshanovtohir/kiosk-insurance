interface Company {
  name: string
  company_id: number
}

export interface GetCompanyResponse {
  jsonrpc: string
  result: Company[]
  id: number
}

export interface GetServiceRequest {
  company_id: number
}

export interface GetStepRequest {
  company_id: number
  service_id: number
}

export interface StepOneRequest {
  company_id: number
  service_id: number
  seria: string
  number: string
  govNumber: string
  step: number
}

export interface StepTwoRequest {
  company_id: number
  service_id: number
  step: number
  applicantIsOwner: string
  phoneNumber: string
  seria: string
  number: string
  driverNumberRestriction: string
  startDate?: string
}

export interface StepThreeRequest {
  company_id: number
  service_id: number
  step_status: number
  relative?: number
  seria?: string
  number?: string
  birthDate?: string
  step: number
}

interface Vehicle {
  govNumber: string
  engineNumber: string
  issueYear: number
  typeId: number
  modelCustomName: string
  techPassport: {
    issueDate: string
    number: string
    seria: string
  }
  regionId: number
  bodyNumber: string
  terrainId: number
}

interface Applicant {
  person: {
    passportData: {
      pinfl: number
      issuedBy: string
      seria: string
      number: string
      issueDate: string
    }
    birthDate: string
    fullName: {
      lastname: string
      middlename: string
      firstname: string
    }
    gender: string
    phoneNumber: string
    districtId: number
    regionId: number
  }
  address: string
  residentOfUzb: number
  citizenshipId: number
  organization: {
    inn: string | ''
    name: string | ''
    phoneNumber: string | ''
  }
  email: string | ''
}

interface Owner {
  applicantIsOwner: string
  organization: {
    inn: string | ''
    name: string | ''
  }
  person: {
    passportData: {
      issueDate: string
      issuedBy: string
      pinfl: string
      number: string
      seria: string
    }
    fullName: {
      middlename: string
      firstname: string
      lastname: string
    }
  }
}

interface Details {
  specialNote: string | ''
  insuredActivityType: string
  driverNumberRestriction: string
  issueDate: string
  startDate: string
  endDate: string
}

interface Cost {
  discountId: number
  sumInsured: string
  contractTermConclusionId: number
  commission: number
  insurancePremium: number
  discountSum: number
  insurancePremiumPaidToInsurer: number
  useTerritoryId: number
}

interface Driver {
  fullName: {
    lastname: string
    firstname: string
    middlename: string
  }
  passportData: {
    seria: string
    pinfl: string
    issueDate: string
    issuedBy: string
    number: string
  }
  birthDate: string
  relative: number
  residentOfUzb: number
  licenseNumber: string
  licenseIssueDate: string
  licenseSeria: string
}

export interface CreateInsuranceRequest {
  company_id: number
  service_id: number
  data: {
    vehicle: Vehicle
    applicant: Applicant
    owner: Owner
    details: Details
    cost: Cost
    drivers: Driver[]
  }
}
