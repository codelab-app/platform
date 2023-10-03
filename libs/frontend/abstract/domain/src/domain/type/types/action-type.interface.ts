import type {
  ActionTypeCreateInput,
  UpdateActionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IActionTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IActionType
  extends IBaseType<
    IActionTypeDTO,
    ActionTypeCreateInput,
    UpdateActionTypesMutationVariables
  > {
  kind: ITypeKind.ActionType
}
