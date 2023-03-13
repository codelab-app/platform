import type {
  ICreateRenderPropsType,
  IOwner,
  IRenderPropsType,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class RenderPropsType extends BaseType implements IRenderPropsType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.RenderPropsType

  declare __typename: `${ITypeKind.RenderPropsType}`

  declare owner: IOwner

  private constructor({ id, name, kind, owner }: IRenderPropsType) {
    super({ __typename: ITypeKind.RenderPropsType, id, kind, name, owner })
  }

  static init({ owner, id }: ICreateRenderPropsType) {
    return new RenderPropsType({
      __typename: ITypeKind.RenderPropsType,
      id,
      kind: ITypeKind.RenderPropsType,
      name: ITypeKind.RenderPropsType,
      owner,
    })
  }
}
