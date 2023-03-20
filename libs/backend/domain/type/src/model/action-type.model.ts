import type {
  IActionTypeDTO,
  IAuth0Owner,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ActionType

  declare __typename: `${ITypeKind.ActionType}`

  declare owner: IAuth0Owner

  constructor({ id, owner }: IActionTypeDTO) {
    super({ id, kind: ITypeKind.ActionType, name: ITypeKind.ActionType, owner })
  }
}
