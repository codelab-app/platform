import type {
  IField,
  IInterfaceType,
  IReactNodeType,
  IRenderPropsType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IModel } from '@codelab/backend/abstract/types'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class RenderPropsType extends BaseType implements IRenderPropsType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.RenderPropsType

  declare __typename: `${ITypeKind.RenderPropsType}`

  declare owner: IUserRef

  constructor({ id, name, kind, owner }: IRenderPropsType) {
    super({ id, name, kind, __typename: ITypeKind.RenderPropsType, owner })
  }
}
