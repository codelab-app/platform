import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { hasRoleAddOn } from './guard-addons'
import { Role } from './role'

/**
 * Allows only if the current user has ONE OF the roles in the allowedRoles array
 * Note that you need to apply GqlAuthGuard as well for this to work
 */
export const GqlRoleGuard = (allowedRoles: Array<Role>) => {
  const checkRole = hasRoleAddOn(allowedRoles)

  @Injectable()
  class _GqlRoleGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      const hasRole = checkRole(context)

      if (!hasRole) {
        throw new Error(
          "You don't have the required role to access this resource",
        )
      }

      return true
    }
  }

  return _GqlRoleGuard
}
