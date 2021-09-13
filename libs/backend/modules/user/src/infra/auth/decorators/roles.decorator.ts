import { Role } from '@codelab/shared/abstract/core'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'

export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles)
