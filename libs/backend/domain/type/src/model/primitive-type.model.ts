import type {
  ICreatePrimitiveType,
  IOwner,
  IPrimitiveType,
} from '@codelab/backend/abstract/core'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
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
    kind,
    name,
    owner,
    primitiveKind,
  }: IPrimitiveType) {
    super({ __typename: ITypeKind.PrimitiveType, id, kind, name, owner })
    this.primitiveKind = primitiveKind
  }

  static init({ id, owner, primitiveKind }: ICreatePrimitiveType) {
    return new PrimitiveType({
      __typename: ITypeKind.PrimitiveType,
      id,
      kind: ITypeKind.PrimitiveType,
      name: primitiveKind,
      owner,
      primitiveKind,
    })
  }
}
