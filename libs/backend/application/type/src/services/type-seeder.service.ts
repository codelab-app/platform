import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type { IFieldDTO, ITypeDTO } from '@codelab/shared/abstract/core'
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

  async seedTypes(types: Array<ITypeDTO>) {
    await Promise.all(
      Object.values(types).map(
        async (type) => await this.typeFactory.save(type, { name: type.name }),
      ),
    )
  }
}
