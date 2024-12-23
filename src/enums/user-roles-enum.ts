export enum UserRoles {
  OPERATOR = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
  ACCOUNTANT = 4,
  SUPPORT = 5,
  INCASATOR = 6,
}

export enum UserRolesOutPut {
  OPERATOR = 'ОПЕРАТОР',
  ADMIN = 'АДМИН',
  SUPER_ADMIN = 'CУПЕР АДМИН',
  ACCOUNTANT = 'БУХАЛТЕР',
  SUPPORT = 'ПОДДЕРЖКА',
  INCASATOR = 'ИНКАССАТОР',
}

export enum UserStatus {
  ACTIVE = 1,
  NONACTIVE = 0,
}

export enum UserStatusOutPut {
  ACTIVE = 'АКТИВНЫЙ',
  NONACTIVE = 'ПАССИВНЫЙ',
}
