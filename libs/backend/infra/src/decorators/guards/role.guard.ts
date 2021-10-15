import { ROLES_KEY } from '@codelab/backend/abstract/types'
import { Role, User } from '@codelab/shared/abstract/core'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
/**
 * Allows only if the current user has ONE OF the roles in the allowedRoles array
 *
 * Note that you need to apply GqlAuthGuard as well for this to work
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Array<Role>>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredRoles) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const user: User = ctx.getContext().req.user
    const canActivate = requiredRoles.some((role) => user.roles?.includes(role))

    if (!canActivate) {
      throw new UnauthorizedException(
        'Admin access only',
        'Only an admin can access this resource',
      )
    }

    return true
  }
}
