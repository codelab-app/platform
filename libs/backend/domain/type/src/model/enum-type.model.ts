import type {
  IEnumType,
  IEnumTypeValue,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IModel, IRepository } from '@codelab/backend/abstract/types'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class EnumType extends BaseType implements IEnumType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.EnumType

  declare __typename: `${ITypeKind.EnumType}`

  declare owner: IUserRef

  allowedValues: Array<IEnumTypeValue>

  constructor({ id, name, kind, allowedValues, owner }: IEnumType) {
    super({ id, name, kind, __typename: ITypeKind.EnumType, owner })
    this.allowedValues = allowedValues
  }
}
