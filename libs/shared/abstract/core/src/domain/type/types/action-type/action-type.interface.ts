import { IBaseType, ITypeKind } from '../base-type'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IActionType extends IBaseType {
  kind: ITypeKind.ActionType
}
