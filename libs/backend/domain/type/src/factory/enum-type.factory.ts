import type {
  IEnumType,
  ITypeFactory,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type { BaseTypeWhere } from '@codelab/shared/abstract/codegen'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { EnumType } from '../model/enum-type.model'
import { EnumTypeRepository } from '../repository/enum-type.repo'

export class EnumTypeFactory implements ITypeFactory<IEnumType> {
  repository: EnumTypeRepository = new EnumTypeRepository()

  async create(data: IEnumType, where?: BaseUniqueWhere) {
    const enumType = new EnumType(data)
    await this.repository.save(
      {
        ...enumType,
      },
      where,
    )

    return enumType
  }
}
