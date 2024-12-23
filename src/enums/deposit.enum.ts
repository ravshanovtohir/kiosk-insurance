export enum DepositStatus {
  STATUS_CREATE = 1,
  STATUS_WAIT = 2,
  STATUS_ERROR = -1,
  STATUS_SUCCESS = 3,
}

export enum DepositStatusOutPut {
  STATUS_CREATE = 'СОЗДАННЫЙ',
  STATUS_WAIT = 'В ПУТИ',
  STATUS_ERROR = 'ОШИБКА',
  STATUS_SUCCESS = 'ПЕРЕДАНО',
}

export enum DepositSource {
  SOURCE_INKASATOR = 1,
  SOURCE_ACCOUNTANT = 2,
}

export enum DepositSourceOutPut {
  SOURCE_INKASATOR = 'ИНКАСАТОР',
  SOURCE_ACCOUNTANT = 'БУХГАЛТЕР',
}
