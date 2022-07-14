import { IBaseType, ITypeKind } from '../base-type'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IAnyActionType extends IBaseType {
  kind: ITypeKind.ActionType
}
