import { ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { hasRoleAddOn } from './guard-addons'
import { Role } from './role'

/**
 * Allows only if the current user has ONE OF the roles in the allowedRoles array
 * Note that you need to apply GqlAuthGuard as well for this to work
 */
// The previous approach with creating new classes didn't work, because
// even though we create different classes, only the first of them gets injected everywhere
export class GqlRoleGuard extends AuthGuard('jwt') {
  private readonly checkRole: (context: ExecutionContext) => boolean

  constructor(allowedRoles: Array<Role>) {
    super()

    this.checkRole = hasRoleAddOn(allowedRoles)
  }

  canActivate(context: ExecutionContext) {
    const hasRole = this.checkRole(context)

    if (!hasRole) {
      throw new Error(
        "You don't have the required role to access this resource",
      )
    }

    return true
  }
}
