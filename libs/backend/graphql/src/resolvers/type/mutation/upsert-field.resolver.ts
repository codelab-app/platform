import { GraphQLRequestContext } from '@codelab/backend/abstract/types'
import { fieldRepository } from '@codelab/backend/application'
import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'

export const upsertField: IFieldResolver<
  undefined,
  GraphQLRequestContext,
  MutationUpsertFieldArgs
> = async (_, args) => {
  return fieldRepository.upsertField(args)
}
