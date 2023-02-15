import type {
  IActionType,
  ICreateActionType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ActionType

  declare __typename?: ITypeKind.ActionType

  declare owner: IUserRef

  private constructor({ id, name, kind, owner }: IActionType) {
    super({ id, name, kind, __typename: ITypeKind.ActionType, owner })
  }

  static init({ owner }: ICreateActionType) {
    return new ActionType({
      id: v4(),
      __typename: ITypeKind.ActionType,
      kind: ITypeKind.ActionType,
      name: ITypeKind.ActionType,
      owner,
    })
  }
}
