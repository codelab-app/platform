import type { IUnknownTypeDto } from '@codelab/shared-abstract-core'

import { ITypeKind } from '@codelab/shared-abstract-core'

import { BaseType } from './base-type.model'

export class UnknownType extends BaseType implements IUnknownTypeDto {
  declare __typename: `${ITypeKind.UnknownType}`

  constructor({ id, owner }: IUnknownTypeDto) {
    super({
      id,
      kind: ITypeKind.UnknownType,
      name: ITypeKind.UnknownType,
      owner,
    })
  }
}
