import type { IActionTypeDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionTypeDto {
  __typename: `${ITypeKind.ActionType}` = ITypeKind.ActionType

  constructor({ id }: IActionTypeDto) {
    super({
      id,
      kind: ITypeKind.ActionType,
      name: ITypeKind.ActionType,
    })
  }
}
