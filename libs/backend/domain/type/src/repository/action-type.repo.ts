import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportActionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IActionTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ActionTypeRepository extends AbstractRepository<
  IActionTypeDTO,
  OGM_TYPES.ActionType,
  OGM_TYPES.ActionTypeWhere
> {
  private ActionType = Repository.instance.ActionType

  async find(where: OGM_TYPES.ActionTypeWhere) {
    return await (
      await this.ActionType
    ).find({
      selectionSet: exportActionTypeSelectionSet,
      where,
    })
  }

  protected async _add(actionTypes: Array<IActionTypeDTO>) {
    return (
      await (
        await this.ActionType
      ).create({
        input: actionTypes.map(({ __typename, owner, ...actionType }) => ({
          ...actionType,
          owner: connectAuth0Owner(owner),
        })),
      })
    ).actionTypes
  }

  protected async _update(
    { __typename, id, owner, ...actionType }: IActionTypeDTO,
    where: OGM_TYPES.ActionTypeWhere,
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
