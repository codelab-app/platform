import { fieldRepository } from '@codelab/backend/application'
import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'

export const upsertField: IFieldResolver<
  unknown,
  unknown,
  MutationUpsertFieldArgs
> = async (parent, args) => {
  return fieldRepository.upsertField(args)
}
