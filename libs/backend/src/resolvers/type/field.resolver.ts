import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { fieldRepository } from '../../repositories/type/field/field.repository'

export const upsertField: IFieldResolver<
  any,
  any,
  MutationUpsertFieldArgs
> = async (parent, args) => {
  return fieldRepository.upsertField(args)
}
