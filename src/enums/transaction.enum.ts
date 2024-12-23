export enum TransactionStatus {
  ERROR = -1,
  NEW = 0,
  PENDING = 1,
  SUCCESS = 2,
  REVERSED = 3,
  HOLD = 4,
  REFUND = 5,
  CASH_NEED_SUPPORT = 6,
}

export enum TransactionStatusOutPut {
  ERROR = 'Ошибка',
  NEW = 'Создано',
  PENDING = 'В ожидании',
  SUCCESS = 'Завершена',
  REVERSED = 'Отменена',
  HOLD = 'В проверке',
  REFUND = 'Возврат',
  CASH_NEED_SUPPORT = 'Наличный транзакция в ожидания подверждения',
}

export enum PaymentStatus {
  CREATED = 0,
  WAITING = 1,
  FINISHED = 2,
  CANCELLED = 3,
}

export enum PaymentStatusOutPut {
  CREATED = 'Отменена',
  WAITING = 'Завершена',
  FINISHED = 'В ожидании',
  CANCELLED = 'Созданный',
}
