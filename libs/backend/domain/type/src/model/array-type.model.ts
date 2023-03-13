import type {
  IArrayType,
  ICreateArrayType,
  IOwner,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ArrayType

  declare __typename: `${ITypeKind.ArrayType}`

  declare owner: IOwner

  private constructor({ id, kind, name, owner }: IArrayType) {
    super({ __typename: ITypeKind.ArrayType, id, kind, name, owner })
  }

  static init({ id, name, owner }: ICreateArrayType) {
    return new ArrayType({
      id,
      kind: ITypeKind.ArrayType,
      name,
      owner,
    })
  }
}
