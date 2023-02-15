import type { IActionType } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  exportActionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/domain/mapper'

export class ActionTypeRepository extends IRepository<IActionType> {
  private ActionType = Repository.instance.ActionType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.ActionType
      ).find({
        where,
        selectionSet: exportActionTypeSelectionSet,
      })
    )[0]
  }

  protected async _add(actionTypes: Array<IActionType>) {
    return (
      await (
        await this.ActionType
      ).create({
        input: actionTypes.map(({ __typename, owner, ...actionType }) => ({
          ...actionType,
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).actionTypes
  }

  protected async _update(
    { __typename, owner, ...actionType }: IActionType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ActionType
      ).update({
        update: actionType,
        where,
      })
    ).actionTypes[0]
  }
}
