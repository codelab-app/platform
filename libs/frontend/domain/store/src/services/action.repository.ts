import type {
  IAction,
  IActionRepository,
  IActionWhere,
} from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { getActionApi } from '../store'

@model('@codelab/ActionRepository')
export class ActionRepository extends Model({}) implements IActionRepository {
  @modelFlow
  add = _async(function* (this: ActionRepository, action: IAction) {
    const {
      createActions: { actions },
    } = yield* _await(
      actionApi.CreateActions({
        input: [action.toCreateInput()],
      }),
    )

    return actions[0]!
  })

  @modelFlow
  update = _async(function* (this: ActionRepository, action: IAction) {
    const {
      updateActions: { actions },
    } = yield* _await(
      actionApi.UpdateActions({
        update: action.toUpdateInput(),
        where: { id: action.id },
      }),
    )

    return actions[0]!
  })

  @modelFlow
  find = _async(function* (this: ActionRepository, where: IActionWhere) {
    const { apiActions, codeActions } = yield* _await(
      getActionApi.GetActions({
        apiActionWhere: where,
        codeActionWhere: where,
      }),
    )

    return [...apiActions, ...codeActions]
  })

  @modelFlow
  delete = _async(function* (this: ActionRepository, actions: Array<IAction>) {
    const {
      deleteActions: { nodesDeleted },
    } = yield* _await(
      actionApi.DeleteActions({
        delete: actions[0]?.toDeleteInput(),
        where: { id_IN: actions.map((action) => action.id) },
      }),
    )

    return nodesDeleted
  })
}
