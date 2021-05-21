import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { hasRoleAddOn, isOwnerAddOn, StringExtractionFn } from './guard-addons'
import { Role } from './role'

/**
 * Allows only if the user is the owner of the resource, proven by the comparing
 * the id of the currently logged in user with the owner id provided by extractOwnerIdFromArgs
 *
 * Note that you need to apply GqlAuthGuard for this to work
 * @param extractOwnerIdFromArgs function to extract ownerId from the arguments. Note that the arguments is an
 * object where the key is the name of the argument
 * @param overrideRoles any user with one of those roles will be allowed despite the owner
 * @constructor
 */
export const IsOwnerAuthGuard = <TInput>(
  extractOwnerIdFromArgs: StringExtractionFn<TInput>,
  overrideRoles?: Array<Role>,
) => {
  const checkOwner = isOwnerAddOn(extractOwnerIdFromArgs)
  const checkRoles = hasRoleAddOn(overrideRoles)

  @Injectable()
  class _IsOwnerAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      const hasOverrideRole = checkRoles(context)

      if (hasOverrideRole) {
        return true
      }

      return checkOwner(context)
    }
  }

  return _IsOwnerAuthGuard
}
