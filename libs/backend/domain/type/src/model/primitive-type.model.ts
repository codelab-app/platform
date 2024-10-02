import type {
  IPrimitiveTypeDto,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import { BaseType } from './base-type.model'

export class PrimitiveType extends BaseType implements IPrimitiveTypeDto {
  __typename: `${ITypeKind.PrimitiveType}` = ITypeKind.PrimitiveType

  primitiveKind: IPrimitiveTypeKind

  constructor({ id, name, primitiveKind }: IPrimitiveTypeDto) {
    super({
      id,
      kind: ITypeKind.PrimitiveType,
      name,
    })

    this.primitiveKind = primitiveKind
  }
}
