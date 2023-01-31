import type {
  IReactNodeType,
  ITypeFactory,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { ReactNodeType } from '../model/react-node-type.model'
import { ReactNodeTypeRepository } from '../repository/react-node-type.repo'

export class ReactNodeTypeFactory implements ITypeFactory<IReactNodeType> {
  repository: ReactNodeTypeRepository = new ReactNodeTypeRepository()

  async create(data: IReactNodeType, where?: BaseUniqueWhere) {
    const reactNodeType = new ReactNodeType(data)
    await this.repository.save(reactNodeType, where)

    return reactNodeType
  }
}
