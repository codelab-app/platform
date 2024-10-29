import type { IRichTextTypeDto } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import { BaseType } from './base-type.model'

export class RichTextType extends BaseType implements IRichTextTypeDto {
  declare __typename: `${ITypeKind.RichTextType}`

  constructor({ id, owner }: IRichTextTypeDto) {
    super({
      id,
      kind: ITypeKind.RichTextType,
      name: ITypeKind.RichTextType,
      owner,
    })
  }
}
