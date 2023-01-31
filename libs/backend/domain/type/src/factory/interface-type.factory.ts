import type {
  IInterfaceType,
  ITypeFactory,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { InterfaceType } from '../model'
import { InterfaceTypeRepository } from '../repository/interface-type.repo'

export class InterfaceTypeFactory implements ITypeFactory<IInterfaceType> {
  repository: InterfaceTypeRepository = new InterfaceTypeRepository()

  async create(data: IInterfaceType, where?: BaseUniqueWhere) {
    const interfaceType = new InterfaceType(data)
    await this.repository.save(interfaceType, where)

    return interfaceType
  }
}
