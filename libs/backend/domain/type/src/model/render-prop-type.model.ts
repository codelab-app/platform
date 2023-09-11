import type {
  IAuth0User,
  IRenderPropTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class RenderPropType extends BaseType implements IRenderPropTypeDTO {
  declare __typename: `${ITypeKind.RenderPropType}`

  constructor({ id }: IRenderPropTypeDTO) {
    super({
      id,
      kind: ITypeKind.RenderPropType,
      name: ITypeKind.RenderPropType,
    })
  }
}
