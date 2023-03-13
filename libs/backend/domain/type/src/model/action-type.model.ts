import type {
  IActionType,
  ICreateActionType,
  IOwner,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ActionType

  declare __typename?: ITypeKind.ActionType

  declare owner: IOwner

  private constructor({ id, name, kind, owner }: IActionType) {
    super({ __typename: ITypeKind.ActionType, id, kind, name, owner })
  }

  static init({ owner, id }: ICreateActionType) {
    return new ActionType({
      __typename: ITypeKind.ActionType,
      id,
      kind: ITypeKind.ActionType,
      name: ITypeKind.ActionType,
      owner,
    })
  }
}
