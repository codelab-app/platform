import type {
  ICreateUnionType,
  ITypeFactory,
  IUnionType,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { UnionType } from '../model'
import { UnionTypeRepository } from '../repository'

export class UnionTypeFactory implements ITypeFactory<ICreateUnionType> {
  repository = new UnionTypeRepository()

  async create(
    { owner, name }: ICreateUnionType,
    where: BaseTypeUniqueWhereCallback<IUnionType>,
  ) {
    const renderPropsType = UnionType.init({
      __typename: ITypeKind.UnionType,
      name,
      owner,
      typesOfUnionType: [],
    })

    await this.repository.save(renderPropsType, where(renderPropsType))

    return renderPropsType
  }
}
