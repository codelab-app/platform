import type { IActionTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ActionType extends BaseType implements IActionTypeDTO {
  __typename: `${ITypeKind.ActionType}` = `${ITypeKind.ActionType}`

  constructor({ id }: IActionTypeDTO) {
    // @ts-ignore
    super({ id, kind: ITypeKind.ActionType, name: ITypeKind.ActionType })
  }
}
