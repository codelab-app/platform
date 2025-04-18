import type { IReactNodeTypeDto } from '@codelab/shared-abstract-core'

import { ITypeKind } from '@codelab/shared-abstract-core'

import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeTypeDto {
  declare __typename: `${ITypeKind.ReactNodeType}`

  constructor({ id, owner }: IReactNodeTypeDto) {
    super({
      id,
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
      owner,
    })
  }
}
