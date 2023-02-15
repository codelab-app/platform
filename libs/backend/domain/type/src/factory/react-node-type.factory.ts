import type {
  ICreateReactNodeType,
  IReactNodeType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { ReactNodeType } from '../model/react-node-type.model'
import { ReactNodeTypeRepository } from '../repository/react-node-type.repo'

export class ReactNodeTypeFactory
  implements ITypeFactory<ICreateReactNodeType>
{
  repository: ReactNodeTypeRepository = new ReactNodeTypeRepository()

  async create(
    { owner }: ICreateReactNodeType,
    where: BaseTypeUniqueWhereCallback<IReactNodeType>,
  ) {
    const reactNodeType = ReactNodeType.init({
      __typename: ITypeKind.ReactNodeType,
      owner,
    })

    await this.repository.save(reactNodeType, where(reactNodeType))

    return reactNodeType
  }
}
