import type {
  IArrayType,
  ICreateArrayType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { ArrayType } from '../model/array-type.model'
import { ArrayTypeRepository } from '../repository'

export class ArrayTypeFactory implements ITypeFactory<ICreateArrayType> {
  repository = new ArrayTypeRepository()

  async create(
    { owner, name }: ICreateArrayType,
    where: BaseTypeUniqueWhereCallback<IArrayType>,
  ) {
    const arrayType = ArrayType.init({
      __typename: ITypeKind.ArrayType,
      name,
      owner,
    })

    await this.repository.save(arrayType, where(arrayType))

    return arrayType
  }
}
