import type {
  ICreatePrimitiveType,
  IPrimitiveType,
  IOwner,
} from '@codelab/backend/abstract/core'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.PrimitiveType

  declare __typename: `${ITypeKind.PrimitiveType}`

  declare owner: IOwner

  primitiveKind: IPrimitiveTypeKind

  private constructor({
    id,
    name,
    kind,
    primitiveKind,
    owner,
  }: IPrimitiveType) {
    super({ __typename: ITypeKind.PrimitiveType, id, kind, name, owner })
    this.primitiveKind = primitiveKind
  }

  static init({ owner, primitiveKind }: ICreatePrimitiveType) {
    return new PrimitiveType({
      __typename: ITypeKind.PrimitiveType,
      id: v4(),
      kind: ITypeKind.PrimitiveType,
      name: primitiveKind,
      owner,
      primitiveKind,
    })
  }
}
