import { typeRepository } from '@codelab/backend/application'
import { GetTypesOfTypesPageQueryVariables } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { Transaction } from 'neo4j-driver'

export const typesOfTypesPage: IFieldResolver<
  any,
  any,
  GetTypesOfTypesPageQueryVariables
> = (_, args) => async (txn: Transaction) => {
  const [items, totalCount] = await Promise.all([
    typeRepository.typesOfTypePage(txn, args),
    typeRepository.countTypesOfTypePage(txn, args?.options?.offset || 0),
  ])

  return {
    items,
    totalCount,
  }
}
