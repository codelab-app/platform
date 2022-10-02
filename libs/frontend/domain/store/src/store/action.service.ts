import type {
  ActionFragment,
  IActionDTO,
  IActionService,
  IAnyAction,
  IApiActionDTO,
  ICreateActionDTO,
  ICreateActionInput,
  IUpdateActionDTO,
} from '@codelab/frontend/abstract/core'
import { getResourceService } from '@codelab/frontend/domain/resource'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
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
  Ref,
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
    let actionModel = this.action(action.id)

    if (actionModel) {
      Action.writeCache(action, actionModel)

      return actionModel
    } else {
      actionModel = Action.create(action)
      this.actions.set(actionModel.id, actionModel)
    }

    return actionModel
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ActionService,
    action: IAnyAction,
    input: IUpdateActionDTO,
  ) {
    const updateInput = makeActionUpdateInput(action, input)

    const [updatedAction] = yield* _await(
      updateActionApi[action.type](updateInput),
    )

    const actionModel = Action.create(updatedAction)
    this.actions.set(updatedAction.id, actionModel)

    return actionModel
  })

  @modelAction
  updateResourceCache(actions: Array<IActionDTO>) {
    const resourceService = getResourceService(this)

    const resources = actions
      .filter((action) => action.__typename === IActionKind.ApiAction)
      .map((action) => (action as IApiActionDTO).resource)

    return resources.map((resource) => resourceService.writeCache(resource))
  }

  @modelAction
  public hydrateOrUpdateCache = (
    actions: Array<IActionDTO>,
  ): Array<IAnyAction> => {
    this.updateResourceCache(actions)

    return actions.map((action) => {
      const actionModel = Action.create(action)
      this.actions.set(action.id, actionModel)

      return actionModel
    })
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, storeId?: string) {
    const actions = yield* _await(getActionsByStore(storeId))

    return this.hydrateOrUpdateCache(actions)
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

    const createdActions: Array<ActionFragment> = yield* _await(
      Promise.all(
        input.map((action) => {
          if (!action.type) {
            throw new Error('Action type must be provided')
          }

          return createActionApi[action.type](action)
        }),
      ).then((res) => res.flat()),
    )

    if (!createdActions?.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Action was not created')
    }

    return createdActions.map((action) => {
      const actionModel = Action.create(action)

      this.actions.set(action.id, actionModel)

      return actionModel
    })
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, id: string) {
    const existing = throwIfUndefined(this.actions.get(id))

    if (this.actions.has(id)) {
      this.actions.delete(id)
    }

    const { nodesDeleted } = yield* _await(
      deleteActionApi[existing.type]({ where: { id } }),
    )

    if (nodesDeleted === 0) {
      // throw error so that the actionic middleware rolls back the changes
      throw new Error('Action was not deleted')
    }

    return existing
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
