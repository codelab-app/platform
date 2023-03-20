import type {
  IAuth0Owner,
  IPrimitiveTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.PrimitiveType

  __typename: `${ITypeKind.PrimitiveType}` = ITypeKind.PrimitiveType

  declare owner: IAuth0Owner

  primitiveKind: IPrimitiveTypeKind

  constructor({ id, owner, primitiveKind }: IPrimitiveTypeDTO) {
    super({
      id,
      kind: ITypeKind.PrimitiveType,
      name: ITypeKind.PrimitiveType,
      owner,
    })

    this.primitiveKind = primitiveKind
  }
}
