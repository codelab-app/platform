import type {
  IArrayType,
  ICreateArrayType,
  IOwner,
} from '@codelab/backend/abstract/core'
import type { IArrayTypeDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ArrayType

  declare __typename: `${ITypeKind.ArrayType}`

  declare owner: IOwner

  declare itemType?: IEntity

  private constructor({ id, itemType, kind, name, owner }: IArrayTypeDTO) {
    super({ __typename: ITypeKind.ArrayType, id, kind, name, owner })
  }

  static init({ id, itemType, name, owner }: ICreateArrayType) {
    return new ArrayType({
      __typename: ITypeKind.ArrayType,
      id,
      itemType,
      kind: ITypeKind.ArrayType,
      name,
      owner,
    })
  }
}
