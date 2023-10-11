import type { Redirect } from '@codelab/backend/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'

export const authGuardResolver: IResolvers = {
  AuthGuard: {},
  Mutation: {},
  Query: {},
  Redirect: {
    __resolveType: (node: Redirect) => node.__typename,
  },
}
