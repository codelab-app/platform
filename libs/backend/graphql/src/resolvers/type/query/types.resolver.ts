import { typeRepository } from '@codelab/backend/application'
import { QueryTypesArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { Transaction } from 'neo4j-driver'

export const types: IFieldResolver<any, any, QueryTypesArgs> =
  (parent, args) => (txn: Transaction) => {
    return typeRepository.getTypes(txn, args)
  }
