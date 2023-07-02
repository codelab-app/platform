import type { BaseAction } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'

export const actionResolver: IResolvers = {
  BaseAction: {
    __resolveType: (action: BaseAction) => action.type,
  },
}
