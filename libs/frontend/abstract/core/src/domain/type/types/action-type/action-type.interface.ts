import type {
  ActionTypeCreateInput,
  UpdateActionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IActionTypeDTO } from './action-type.dto.interface'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IActionType
  extends Omit<
    IBaseType<
      IActionTypeDTO,
      ActionTypeCreateInput,
      UpdateActionTypesMutationVariables,
      void
    >,
    'toDeleteInput'
  > {
  kind: ITypeKind.ActionType
}
