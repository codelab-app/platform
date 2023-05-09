import type {
  ActionType,
  ActionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportActionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IActionTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ActionTypeRepository extends AbstractRepository<
  IActionTypeDTO,
  ActionType,
  ActionTypeWhere
> {
  private ActionType = Repository.instance.ActionType

  async _find(where: ActionTypeWhere) {
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
        selectionSet: `{ actionTypes ${exportActionTypeSelectionSet} }`,
      })
    ).actionTypes
  }

  protected async _update(
    { __typename, id, name, owner, ...actionType }: IActionTypeDTO,
    where: ActionTypeWhere,
  ) {
    return (
      await (
        await this.ActionType
      ).update({
        selectionSet: `{ actionTypes ${exportActionTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).actionTypes[0]
  }
}
