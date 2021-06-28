import { JwtPayload } from '@codelab/backend/adapters'
import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Role } from './role'

export type StringExtractionFn<TInput> = (
  input: TInput,
) => string | undefined | Promise<string | undefined>

export const hasRoleAddOn = (allowedRoles?: Array<Role>) => {
  const allowedRolesSet = new Set(allowedRoles || [])

  return (context: ExecutionContext) => {
    if (!allowedRolesSet || !allowedRolesSet.size) {
      return false
    }

    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const user = req.user as JwtPayload

    // If the user has roles and at least one of them matches our allowed roles set, we're good
    return (
      !!user &&
      !!user['https://api.codelab.ai/jwt/claims']?.roles?.find((r) =>
        allowedRolesSet.has(r as Role),
      )
    )
  }
}
