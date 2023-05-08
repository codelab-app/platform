import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type {
  IAuth0Owner,
  IFieldDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'

export class TypeSeederService {
  fieldRepository = new FieldRepository()

  async seedFields(fields: Array<IFieldDTO>) {
    for await (const field of fields) {
      await this.fieldRepository.save(field, {
        // Save by composite key
        api: {
          id: field.api.id,
        },
        key: field.key,
      })
    }
  }

  /**
   * This way let's us
   */
  async seedTypes(types: Array<ITypeDTO>, owner: IAuth0Owner) {
    await Promise.all(
      Object.values(types).map(
        async (type) =>
          await TypeFactory.save({ ...type, owner }, { name: type.name }),
      ),
    )
  }
}
