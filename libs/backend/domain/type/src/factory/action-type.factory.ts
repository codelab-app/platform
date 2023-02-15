import type {
  IActionType,
  ICreateActionType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { ActionType } from '../model/action-type.model'
import { ActionTypeRepository } from '../repository/action-type.repo'

export class ActionTypeFactory implements ITypeFactory<ICreateActionType> {
  repository: ActionTypeRepository = new ActionTypeRepository()

  async create(
    { owner }: ICreateActionType,
    where: BaseTypeUniqueWhereCallback<IActionType>,
  ) {
    const actionType = ActionType.init({
      owner,
      __typename: ITypeKind.ActionType,
    })

    await this.repository.save(actionType, where(actionType))

    return actionType
  }
}
