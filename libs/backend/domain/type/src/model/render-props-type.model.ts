import type {
  IAuth0Owner,
  IRenderPropsTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class RenderPropsType extends BaseType implements IRenderPropsTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.RenderPropsType

  declare __typename: `${ITypeKind.RenderPropsType}`

  declare owner: IAuth0Owner

  constructor({ id, owner }: IRenderPropsTypeDTO) {
    super({
      id,
      kind: ITypeKind.RenderPropsType,
      name: ITypeKind.RenderPropsType,
      owner,
    })
  }
}
