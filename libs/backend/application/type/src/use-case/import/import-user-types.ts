import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type {
  IAuth0Owner,
  IFieldDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'

export const importUserTypes = async (
  fields: Array<IFieldDTO>,
  types: Array<ITypeDTO>,
  owner: IAuth0Owner,
): Promise<void> => {
  const fieldRepository = new FieldRepository()

  for (const type of types) {
    await TypeFactory.save({ ...type, owner })
  }

  await fieldRepository.add(fields)
}
