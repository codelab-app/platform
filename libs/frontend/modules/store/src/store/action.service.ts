import {
  getResourceService,
  resourceRef,
} from '@codelab/frontend/modules/resource'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import {
  ActionCreateInput,
  ActionWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  IAction,
  IActionDTO,
  IActionService,
  ICreateActionDTO,
  IResourceDTO,
  IUpdateActionDTO,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
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
import { actionApi } from './action.api'
import { Action } from './action.model'
import { ActionModalService } from './action-modal.service'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actions: prop(() => objectMap<Action>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ActionModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    selectedActions: prop(() => Array<Ref<Action>>()).withSetter(),
  })
  implements IActionService
{
  actionsList(storeId: Nullish<string>) {
    const actions = [...this.actions.values()]

    return storeId ? actions.filter((x) => x.storeId === storeId) : actions
  }

  action(id: string) {
    return this.actions.get(id)
  }

  @modelAction
  addAction(action: Action) {
    this.actions.set(action.id, action)
  }

  @modelAction
  addOrUpdate(action: IActionDTO) {
    const existing = this.action(action.id)

    if (existing) {
      existing.name = action.name
      existing.body = action.body ?? ''
      existing.resource = action.resource
        ? resourceRef(action.resource.id)
        : null
      existing.runOnInit = action.runOnInit
      existing.storeId = action.store.id
      existing.config?.updateCache(action.config)
    } else {
      this.addAction(Action.hydrate(action))
    }
  }

  @modelAction
  updateCache(actions: Array<IActionDTO>) {
    for (const action of actions) {
      this.addOrUpdate(action)
    }
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ActionService,
    action: Action,
    input: IUpdateActionDTO,
  ) {
    const { updateActions } = yield* _await(
      actionApi.UpdateActions({
        where: { id: action.id },
        update: {
          body: input.body,
          name: input.name,
          resource: input.resourceId
            ? {
                disconnect: {},
                connect: { where: { node: { id: input.resourceId } } },
              }
            : undefined,
          runOnInit: input.runOnInit,
          config: {
            update: { node: { data: JSON.stringify(input.config) } },
          },
        },
      }),
    )

    const updatedAction = updateActions.actions[0]
    const actionModel = Action.hydrate(updatedAction)
    this.actions.set(updatedAction.id, actionModel)

    return actionModel
  })

  @modelAction
  updateResourceCache(actions: Array<IActionDTO>) {
    const resourceService = getResourceService(this)

    const resources: Array<IResourceDTO> = actions
      .map((a) => a.resource)
      .filter((r): r is IResourceDTO => Boolean(r))

    resourceService.updateCache(resources)
  }

  @modelAction
  public hydrateOrUpdateCache = (
    actions: Array<IActionDTO>,
  ): Array<IAction> => {
    this.updateResourceCache(actions)

    return actions.map((action) => {
      const actionModel = Action.hydrate(action)
      this.actions.set(action.id, actionModel)

      return actionModel
    })
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where?: ActionWhere) {
    this.actions.clear()

    const { actions } = yield* _await(actionApi.GetActions({ where }))

    return this.hydrateOrUpdateCache(actions)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionService, id: string) {
    return this.actions.has(id)
      ? this.actions.get(id)
      : (yield* _await(this.getAll({ id })))[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: ActionService,
    data: Array<ICreateActionDTO>,
  ) {
    const input: Array<ActionCreateInput> = data.map((action) => ({
      name: action.name,
      body: action.body,
      store: { connect: { where: { node: { id: action.storeId } } } },
      config: { create: { node: { data: JSON.stringify(action.config) } } },
      resource: action.resourceId
        ? { connect: { where: { node: { id: action.resourceId } } } }
        : undefined,
      runOnInit: action.runOnInit,
    }))

    const {
      createActions: { actions },
    } = yield* _await(
      actionApi.CreateActions({
        input,
      }),
    )

    if (!actions.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Action was not created')
    }

    return actions.map((action) => {
      const actionModel = Action.hydrate(action)

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

    const { deleteActions } = yield* _await(
      actionApi.DeleteActions({ where: { id } }),
    )

    if (deleteActions.nodesDeleted === 0) {
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
