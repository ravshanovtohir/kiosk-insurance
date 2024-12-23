interface Driver {
  datebirth: string
  surname: string
  name: string
  patronym: string
  licsery: string
  licnumber: string
  pinfl: string
  relative: number
  resident: number
  paspsery: string
  paspnumber: string
  licdate: string
}

interface Data {
  texpdate: string
  year: string
  dvigatel: string
  vehicle: string
  model: string | null
  kuzov: string
  texpsery: string
  texpnumber: string
  renumber: string
  type: string
  marka: string
  vmodel: string
  appl_name: string | null
  owner_fy: number
  owner_pinfl: string
  owner_oblast: string
  has_benefit: string
  appl_birthdate: string | null
  owner_rayon: string
  owner_surname: string
  owner_name: string
  owner_patronym: string
  appl_surname: string | null
  owner_inn: string
  owner_orgname: string | null
  owner_pasp_sery: string
  owner_pasp_num: string
  applicant_isowner: number
  owner_phone: string
  owner_isdriver: number
  appl_pasp_num: string | null
  appl_orgname: string | null
  appl_patronym: string | null
  appl_oblast: string | null
  address: string
  prem: number
  appl_inn: string | null
  driver_limit: number
  period: number
  discount: number
  owner_birthdate: string
  appl_rayon: string | null
  use_territory: number
  appl_fizyur: string | null
  appl_pinfl: string | null
  appl_pasp_sery: string | null
  old_polis: string | null
  contract_begin: string
  dog_num: string | null
  dog_date: string | null
  opl_type: number
  is_renewal: number
  step_status: number
  drivers: Driver[]
}

export interface CreateInsuranceRequest {
  company_id: number
  service_id: number
  data: Data
}
