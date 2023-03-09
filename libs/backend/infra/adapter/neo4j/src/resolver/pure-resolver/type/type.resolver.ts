import type { IBaseType } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import { baseTypes } from './query'

export const typeResolver: IResolvers = {
  IBaseType: {
    __resolveType: (type: IBaseType) => type.kind,
  },
  Mutation: {},
  Query: {
    baseTypes: baseTypes,
  },
}
