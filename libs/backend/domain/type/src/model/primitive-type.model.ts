import type {
  IPrimitiveTypeDTO,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveTypeDTO {
  __typename: `${ITypeKind.PrimitiveType}` = ITypeKind.PrimitiveType

  primitiveKind: IPrimitiveTypeKind

  constructor({ id, name, primitiveKind }: IPrimitiveTypeDTO) {
    // @ts-ignore
    super({
      id,
      kind: ITypeKind.PrimitiveType,
      name,
    })

    this.primitiveKind = primitiveKind
  }
}
