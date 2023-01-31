import type {
  IActionType,
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

export class ActionType extends BaseType implements IActionType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ActionType

  declare __typename?: ITypeKind.ActionType

  declare owner: IUserRef

  constructor({ id, name, kind, owner }: IActionType) {
    super({ id, name, kind, __typename: ITypeKind.ActionType, owner })
  }
}
