import type {
  ActionTypeCreateInput,
  UpdateActionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IActionTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IActionTypeModel
  extends IBaseTypeModel<
    IActionTypeDTO,
    ActionTypeCreateInput,
    UpdateActionTypesMutationVariables
  > {
  kind: ITypeKind.ActionType
}
