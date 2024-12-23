export enum InsuranceStatus {
  ERROR = -1,
  NEW = 0,
  PENDING = 1,
  SUCCESS = 2,
  REVERSED = 3,
  HOLD = 4,
  REFUND = 5,
  CASH_NEED_SUPPORT = 6,
}

export enum InsuranceStatusOutput {
  ERROR = 'Ошибка',
  NEW = 'Создано',
  PENDING = 'В ожидании',
  SUCCESS = 'Завершена',
  REVERSED = 'Отменена',
  HOLD = 'В проверке',
  REFUND = 'Возврат',
  CASH_NEED_SUPPORT = 'Наличный транзакция в ожидании подтверждения',
}
