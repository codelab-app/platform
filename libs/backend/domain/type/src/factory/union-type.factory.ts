import type {
  ICreateUnionType,
  IUnionType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { UnionType } from '../model'
import { UnionTypeRepository } from '../repository'

export class UnionTypeFactory extends ITypeFactory<
  ICreateUnionType,
  IUnionType
> {
  repository = new UnionTypeRepository()

  async _create(
    { id, owner, name }: ICreateUnionType,
    where: BaseTypeUniqueWhereCallback<IUnionType>,
  ) {
    const renderPropsType = UnionType.init({
      __typename: ITypeKind.UnionType,
      id,
      name,
      owner,
      typesOfUnionType: [],
    })

    return await this.repository.save(renderPropsType, where(renderPropsType))
  }
}
