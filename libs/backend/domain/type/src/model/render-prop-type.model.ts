import type { IRenderPropTypeDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class RenderPropType extends BaseType implements IRenderPropTypeDto {
  declare __typename: `${ITypeKind.RenderPropType}`

  constructor({ id }: IRenderPropTypeDto) {
    super({
      id,
      kind: ITypeKind.RenderPropType,
      name: ITypeKind.RenderPropType,
    })
  }
}
