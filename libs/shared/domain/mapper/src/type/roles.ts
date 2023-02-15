import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IRole } from '@codelab/shared/abstract/core'

export const rolesToEnum = (roles: Array<keyof typeof IRole>) =>
  roles.map((role) => OGM_TYPES.Role[role])
