import type {
  IActionService,
  IApiActionDTO,
  ICreateActionDTO,
  ICreateActionInput,
  IUpdateActionDTO,
} from '@codelab/frontend/abstract/core'
import { IActionDTO, IAnyAction } from '@codelab/frontend/abstract/core'
import { getResourceService } from '@codelab/frontend/domain/resource'
import { ModalService } from '@codelab/frontend/shared/utils'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { ActionModalService } from './action-modal.service'
import {
  createActionApi,
  deleteActionApi,
  getActionsByStore,
  makeActionCreateInput,
  makeActionUpdateInput,
  updateActionApi,
} from './apis'
import { Action } from './models'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actions: prop(() => objectMap<IAnyAction>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ActionModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    selectedActions: prop(() => Array<Ref<IAnyAction>>()).withSetter(),
  })
  implements IActionService
{
  @computed
  get actionsList() {
    return [...this.actions.values()]
  }

  action(id: string) {
    return this.actions.get(id)
  }

  @modelAction
  addAction(action: IAnyAction) {
    this.actions.set(action.id, action)
  }

  @modelAction
  writeCache(action: IActionDTO) {
    this.updateResourceCache([action])

    let actionModel = this.action(action.id)

    if (actionModel) {
      Action.writeCache(action, actionModel)
    } else {
      actionModel = Action.create(action)
      this.actions.set(actionModel.id, actionModel)
    }

    return actionModel
  }

  @modelFlow
  @transaction
  update = _async(function* (this: ActionService, actionDTO: IUpdateActionDTO) {
    const updateInput = makeActionUpdateInput(actionDTO)
    const actions = yield* _await(updateActionApi[actionDTO.type](updateInput))

    return actions.map((action) => this.writeCache(action))
  })

  @modelAction
  updateResourceCache(actions: Array<IActionDTO>) {
    const resourceService = getResourceService(this)

    const resources = actions
      .filter((action) => action.__typename === IActionKind.ApiAction)
      .map((action) => (action as IApiActionDTO).resource)

    return resources.map((resource) => resourceService.writeCache(resource))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, storeId?: string) {
    const actions = yield* _await(getActionsByStore(storeId))

    return actions.map((action) => this.writeCache(action))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionService, id: string) {
    return this.actions.has(id)
      ? this.actions.get(id)
      : (yield* _await(this.getAll(id)))[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: ActionService,
    data: Array<ICreateActionDTO>,
  ) {
    const input: Array<ICreateActionInput> = data.map((action) =>
      makeActionCreateInput(action),
    )

    const actions: Array<IActionDTO> = yield* _await(
      Promise.all(
        input.map((action) => {
          if (!action.type) {
            throw new Error('Action type must be provided')
          }

          return createActionApi[action.type](action)
        }),
      ).then((res) => res.flat()),
    )

    return actions.map((action) => this.writeCache(action))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, ids: Array<string>) {
    const actions = ids
      .map((id) => this.actions.get(id))
      .filter((action): action is IAnyAction => Boolean(action))

    ids.forEach((id) => this.actions.delete(id))

    const results = yield* _await(
      Promise.all(
        actions.map((action) =>
          deleteActionApi[action.type]({ where: { id: action.id } }),
        ),
      ),
    )

    return results.reduce((total, { nodesDeleted }) => nodesDeleted + total, 0)
  })
}

export const actionServiceContext = createContext<IActionService>()

export const getActionService = (self: object) => {
  const actionStore = actionServiceContext.get(self)

  if (!actionStore) {
    throw new Error('ActionService context is not defined')
  }

  return actionStore
}
