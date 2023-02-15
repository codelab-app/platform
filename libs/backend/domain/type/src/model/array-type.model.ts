import type {
  IArrayType,
  ICreateArrayType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ArrayType

  declare __typename: `${ITypeKind.ArrayType}`

  declare owner: IUserRef

  private constructor({ id, name, kind, owner }: IArrayType) {
    super({ id, name, kind, owner, __typename: ITypeKind.ArrayType })
  }

  static init({ owner, name }: ICreateArrayType) {
    return new ArrayType({
      id: v4(),
      name,
      kind: ITypeKind.ArrayType,
      owner,
    })
  }
}
