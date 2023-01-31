import type { IPrimitiveType, IUserRef } from '@codelab/backend/abstract/core'
import { BaseTypeSchema } from '@codelab/backend/abstract/core'
import type { IModel, IRepository } from '@codelab/backend/abstract/types'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.PrimitiveType

  declare __typename: `${ITypeKind.PrimitiveType}`

  declare owner: IUserRef

  primitiveKind: IPrimitiveTypeKind

  constructor({ id, name, kind, primitiveKind, owner }: IPrimitiveType) {
    super({ id, name, kind, __typename: ITypeKind.PrimitiveType, owner })
    this.primitiveKind = primitiveKind
  }
}
