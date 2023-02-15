import type {
  ICreateRenderPropsType,
  IRenderPropsType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class RenderPropsType extends BaseType implements IRenderPropsType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.RenderPropsType

  declare __typename: `${ITypeKind.RenderPropsType}`

  declare owner: IUserRef

  private constructor({ id, name, kind, owner }: IRenderPropsType) {
    super({ id, name, kind, __typename: ITypeKind.RenderPropsType, owner })
  }

  static init({ owner }: ICreateRenderPropsType) {
    return new RenderPropsType({
      id: v4(),
      __typename: ITypeKind.RenderPropsType,
      kind: ITypeKind.RenderPropsType,
      name: ITypeKind.RenderPropsType,
      owner,
    })
  }
}
