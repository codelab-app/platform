import type { IAnyTypeDto } from '@codelab/shared-abstract-core'

import { ITypeKind } from '@codelab/shared-abstract-core'

import { BaseType } from './base-type.model'

export class AnyType extends BaseType implements IAnyTypeDto {
  declare __typename: `${ITypeKind.AnyType}`

  constructor({ id, owner }: IAnyTypeDto) {
    super({
      id,
      kind: ITypeKind.AnyType,
      name: ITypeKind.AnyType,
      owner,
    })
  }
}
