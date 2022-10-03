import { typeRepository } from '@codelab/backend/application'
import { QueryBaseTypesArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { GraphQLRequestContext } from 'graphql-request/dist/types'
import { Transaction } from 'neo4j-driver'

export const baseTypes: IFieldResolver<
  GraphQLRequestContext,
  undefined,
  QueryBaseTypesArgs
> = (_, args) => async (txn: Transaction) => {
  const [items, totalCount] = await Promise.all([
    typeRepository.baseTypes(txn, args),
    typeRepository.countBaseTypes(txn, args?.options?.offset || 0),
  ])

  return {
    items,
    totalCount,
  }
}
