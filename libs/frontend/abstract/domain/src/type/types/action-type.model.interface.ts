import type {
  ActionTypeCreateInput,
  UpdateActionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IActionTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows choosing an action from the list of actions.
 */
export interface IActionTypeModel
  extends IBaseTypeModel<
    IActionTypeDto,
    ActionTypeCreateInput,
    UpdateActionTypesMutationVariables
  > {
  kind: ITypeKind.ActionType
}
