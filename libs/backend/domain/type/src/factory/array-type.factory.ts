import type {
  IArrayType,
  ICreateArrayType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { ArrayType } from '../model/array-type.model'
import { ArrayTypeRepository } from '../repository'

export class ArrayTypeFactory extends ITypeFactory<
  ICreateArrayType,
  IArrayType
> {
  repository = new ArrayTypeRepository()

  async _create(
    { id, owner, name }: ICreateArrayType,
    where: BaseTypeUniqueWhereCallback<IArrayType>,
  ) {
    const arrayType = ArrayType.init({
      __typename: ITypeKind.ArrayType,
      id,
      name,
      owner,
    })

    return await this.repository.save(arrayType, where(arrayType))
  }
}
