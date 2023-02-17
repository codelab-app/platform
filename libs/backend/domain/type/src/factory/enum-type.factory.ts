import type { ICreateEnumType, IEnumType } from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { EnumType } from '../model/enum-type.model'
import { EnumTypeRepository } from '../repository/enum-type.repo'

export class EnumTypeFactory extends ITypeFactory<ICreateEnumType, IEnumType> {
  repository: EnumTypeRepository = new EnumTypeRepository()

  async _create(
    { name, owner, allowedValues }: ICreateEnumType,
    where: BaseTypeUniqueWhereCallback<IEnumType>,
  ) {
    const enumType = EnumType.init({
      __typename: ITypeKind.EnumType,
      name,
      owner,
      allowedValues,
    })

    return await this.repository.save(enumType, where(enumType))
  }
}
