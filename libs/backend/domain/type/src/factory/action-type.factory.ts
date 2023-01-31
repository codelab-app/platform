import type { IActionType, ITypeFactory } from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { ActionType } from '../model/action-type.model'
import { ActionTypeRepository } from '../repository/action-type.repo'

export class ActionTypeFactory implements ITypeFactory<IActionType> {
  repository: ActionTypeRepository

  constructor() {
    this.repository = new ActionTypeRepository()
  }

  async create(data: IActionType, where?: BaseUniqueWhere) {
    const actionType = new ActionType(data)
    await this.repository.save(actionType, where)

    return actionType
  }
}
