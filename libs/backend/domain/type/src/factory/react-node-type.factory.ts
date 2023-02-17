import type {
  ICreateReactNodeType,
  IReactNodeType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { ReactNodeType } from '../model/react-node-type.model'
import { ReactNodeTypeRepository } from '../repository/react-node-type.repo'

export class ReactNodeTypeFactory extends ITypeFactory<
  ICreateReactNodeType,
  IReactNodeType
> {
  repository: ReactNodeTypeRepository = new ReactNodeTypeRepository()

  async _create(
    { owner }: ICreateReactNodeType,
    where: BaseTypeUniqueWhereCallback<IReactNodeType>,
  ) {
    const reactNodeType = ReactNodeType.init({
      __typename: ITypeKind.ReactNodeType,
      owner,
    })

    return await this.repository.save(reactNodeType, where(reactNodeType))
  }
}
