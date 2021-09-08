import { Role } from '@codelab/shared/abstract/core'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JWT_CLAIMS } from './interfaces/jwt.interface'
import { ROLES_KEY } from './roles.decorator'

/**
 * Allows only if the current user has ONE OF the roles in the allowedRoles array
 * Note that you need to apply GqlAuthGuard as well for this to work
 */
// The previous approach with creating new classes didn't work, because
// even though we create different classes, only the first of them gets injected everywhere
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
    const { user } = ctx.getContext().req

    return requiredRoles.some((role) => user[JWT_CLAIMS].roles?.includes(role))
  }
}
