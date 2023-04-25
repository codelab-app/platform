import type {
  IAuth0Owner,
  IRenderPropTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class RenderPropType extends BaseType implements IRenderPropTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.RenderPropType

  declare __typename: `${ITypeKind.RenderPropType}`

  declare owner: IAuth0Owner

  constructor({ id, owner }: IRenderPropTypeDTO) {
    super({
      id,
      kind: ITypeKind.RenderPropType,
      name: ITypeKind.RenderPropType,
      owner,
    })
  }
}
