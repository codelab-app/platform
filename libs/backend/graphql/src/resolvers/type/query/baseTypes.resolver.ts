import { typeRepository } from '@codelab/backend/application'
import { QueryBaseTypesArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { GraphQLRequestContext } from 'graphql-request/dist/types'
import { Transaction } from 'neo4j-driver'

export const baseTypes: IFieldResolver<
  GraphQLRequestContext,
  unknown,
  QueryBaseTypesArgs
> = (_, args) => async (txn: Transaction) => {
  return typeRepository.baseTypes(txn, args)
}
