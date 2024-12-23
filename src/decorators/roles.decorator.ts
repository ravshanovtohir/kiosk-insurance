import { SetMetadata } from '@nestjs/common'
import { ROLES_KEY } from '@constants'
import { UserRoles } from '@enums'

export interface Role {
  role: UserRoles[]
}

export const Roles = (roles: Role) => SetMetadata(ROLES_KEY, roles)
