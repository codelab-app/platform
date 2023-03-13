import type {
  ICreateInterfaceType,
  IInterfaceType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { InterfaceType } from '../model'
import { InterfaceTypeRepository } from '../repository/interface-type.repo'

export class InterfaceTypeFactory extends ITypeFactory<
  ICreateInterfaceType,
  IInterfaceType
> {
  repository: InterfaceTypeRepository = new InterfaceTypeRepository()

  async _create(
    { owner, name, fields, id }: ICreateInterfaceType,
    where: BaseTypeUniqueWhereCallback<IInterfaceType>,
  ) {
    const interfaceType = InterfaceType.init({
      __typename: ITypeKind.InterfaceType,
      fields,
      id,
      name,
      owner,
    })

    return await this.repository.save(interfaceType, where(interfaceType))
  }
}
