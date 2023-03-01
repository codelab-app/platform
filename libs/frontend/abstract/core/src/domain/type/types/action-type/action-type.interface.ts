import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IActionTypeDTO } from './action-type.dto.interface'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IAnyActionType extends IBaseType<IActionTypeDTO> {
  kind: ITypeKind.ActionType
}
