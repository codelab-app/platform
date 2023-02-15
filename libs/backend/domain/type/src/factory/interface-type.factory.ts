import type {
  ICreateInterfaceType,
  IInterfaceType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { InterfaceType } from '../model'
import { InterfaceTypeRepository } from '../repository/interface-type.repo'

export class InterfaceTypeFactory
  implements ITypeFactory<ICreateInterfaceType>
{
  repository: InterfaceTypeRepository = new InterfaceTypeRepository()

  async create(
    { owner, name, fields }: ICreateInterfaceType,
    where: BaseTypeUniqueWhereCallback<IInterfaceType>,
  ) {
    const interfaceType = InterfaceType.init({
      __typename: ITypeKind.InterfaceType,
      name,
      owner,
      fields,
    })

    await this.repository.save(interfaceType, where(interfaceType))

    return interfaceType
  }
}
