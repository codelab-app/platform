import type { IFieldDto, ITypeDto } from '@codelab/shared/abstract/core'

import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeSeederService {
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async seedFields(fields: Array<IFieldDto>) {
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

  async seedTypes(types: Array<ITypeDto>) {
    await Promise.all(
      Object.values(types).map(
        async (type) => await this.typeFactory.save(type, { name: type.name }),
      ),
    )
  }
}
