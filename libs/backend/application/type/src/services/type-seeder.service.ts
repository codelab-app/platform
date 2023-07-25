import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type {
  IAuth0User,
  IFieldDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeSeederService {
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

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

  async seedTypes(types: Array<ITypeDTO>, owner: IAuth0User) {
    await Promise.all(
      Object.values(types).map(
        async (type) =>
          await this.typeFactory.save({ ...type, owner }, { name: type.name }),
      ),
    )
  }
}
