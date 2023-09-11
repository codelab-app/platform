import type {
  IAuth0User,
  IPrimitiveTypeDTO,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveTypeDTO {
  __typename: `${ITypeKind.PrimitiveType}` = ITypeKind.PrimitiveType

  primitiveKind: IPrimitiveTypeKind

  constructor({ id, name, primitiveKind }: IPrimitiveTypeDTO) {
    super({
      id,
      kind: ITypeKind.PrimitiveType,
      name,
    })

    this.primitiveKind = primitiveKind
  }
}
