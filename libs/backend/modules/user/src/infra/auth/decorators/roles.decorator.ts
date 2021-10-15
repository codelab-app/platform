import { ROLES_KEY } from '@codelab/backend/abstract/types'
import { Role } from '@codelab/shared/abstract/core'
import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles)
