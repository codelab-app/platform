import { typeRepository } from '@codelab/backend/domain/type'
import type { QueryBaseTypesArgs } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { GraphQLRequestContext } from 'graphql-request/dist/types'
import type { Transaction } from 'neo4j-driver'

export const baseTypes: IFieldResolver<
  GraphQLRequestContext,
  unknown,
  QueryBaseTypesArgs
> = (_, args) => async (txn: Transaction) => {
  return typeRepository.baseTypes(txn, args)
}
