import type {
  IActionType,
  ICreateActionType,
  IOwner,
} from '@codelab/backend/abstract/core'
import type { IActionTypeDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ActionType

  declare __typename: `${ITypeKind.ActionType}`

  declare owner: IOwner

  private constructor({ id, kind, name, owner }: IActionType) {
    super({ __typename: ITypeKind.ActionType, id, kind, name, owner })
  }

  static init({ id, owner }: ICreateActionType) {
    return new ActionType({
      __typename: ITypeKind.ActionType,
      id,
      kind: ITypeKind.ActionType,
      name: ITypeKind.ActionType,
      owner,
    })
  }
}
