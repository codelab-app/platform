import type {
  ICreateEnumType,
  IEnumType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { EnumType } from '../model/enum-type.model'
import { EnumTypeRepository } from '../repository/enum-type.repo'

export class EnumTypeFactory implements ITypeFactory<ICreateEnumType> {
  repository: EnumTypeRepository = new EnumTypeRepository()

  async create(
    { id, name, owner, allowedValues }: ICreateEnumType,
    where: BaseTypeUniqueWhereCallback<IEnumType>,
  ) {
    const enumType = EnumType.init({
      id,
      __typename: ITypeKind.EnumType,
      name,
      owner,
      allowedValues,
    })

    await this.repository.save(enumType, where(enumType))

    return enumType
  }
}
