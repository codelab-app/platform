import { ITypeKind } from '@codelab/shared/abstract/core'
import { IBaseType } from '../base-type'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IAnyActionType extends IBaseType {
  kind: ITypeKind.ActionType
}
