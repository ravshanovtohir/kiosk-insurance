export interface GetInsuranceIds {
  id: number
  order_id: string
  anketa_id: string
  polis_id: number
  vendor_id: number
}

export interface TransactionPreparePayCardResponse {
  id: string
  transaction_id: number
  bank_transaction_id: number
  reference_number: number
  amount: number
  merchantId: number
  terminalId: number
}

export interface PreparePayCardRequest {
  card_number: string
  card_expire: string
}

export interface PrepareToPayRequest {
  phone_number: string
  amount: string
  vendor_id: number
}

export interface ConfirmPaymentRequest {
  confirmation_code: string
}

export interface RefundCashRequest {
  phoneNumber: string
}
