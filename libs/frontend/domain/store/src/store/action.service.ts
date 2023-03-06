import type {
  IActionService,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import { IAction, IActionDTO } from '@codelab/frontend/abstract/core'
import { getPropService, propRef } from '@codelab/frontend/domain/prop'
import {
  getResourceService,
  resourceRef,
} from '@codelab/frontend/domain/resource'
import { getTypeService } from '@codelab/frontend/domain/type'
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
import { ActionFactory } from './action.factory'
import { ActionModalService } from './action-modal.service'
import {
  createActionApi,
  deleteActionApi,
  getActionsByStore,
  makeActionCreateInput,
  makeActionUpdateInput,
  updateActionApi,
} from './apis'
import { actionRef, ApiAction, CodeAction, storeRef } from './models'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actionFactory: prop(() => new ActionFactory({})),
    actions: prop(() => objectMap<IAction>()),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    selectedActions: prop(() => Array<Ref<IAction>>()).withSetter(),
    updateModal: prop(() => new ActionModalService({})),
  })
  implements IActionService
{
  @computed
  get actionsList() {
    return [...this.actions.values()]
  }

  @computed
  get propService() {
    return getPropService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  private get resourceService() {
    return getResourceService(this)
  }

  action(id: string) {
    return this.actions.get(id)
  }

  @modelAction
  addAction(action: IAction) {
    this.actions.set(action.id, action)
  }

  @modelAction
  add(actionDTO: IActionDTO) {
    switch (actionDTO.__typename) {
      case IActionKind.CodeAction: {
        return new CodeAction({
          code: actionDTO.code,
          id: actionDTO.id,
          name: actionDTO.name,
          store: storeRef(actionDTO.store.id),
          type: IActionKind.CodeAction,
        })
      }

      case IActionKind.ApiAction: {
        return new ApiAction({
          config: propRef(actionDTO.config.id),
          errorAction: actionDTO.errorAction?.id
            ? actionRef(actionDTO.errorAction.id)
            : null,
          id: actionDTO.id,
          name: actionDTO.name,
          resource: resourceRef(actionDTO.resource.id),
          store: storeRef(actionDTO.store.id),
          successAction: actionDTO.successAction?.id
            ? actionRef(actionDTO.successAction.id)
            : null,
          type: IActionKind.ApiAction,
        })
      }

      default: {
        throw new Error('Invalid action type')
      }
    }
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ActionService,
    actionDTO: IUpdateActionData,
  ) {
    const updateInput = makeActionUpdateInput(actionDTO)

    const actionFragment = (yield* _await(
      updateActionApi[actionDTO.type](updateInput),
    ))[0]

    const action = this.actionFactory.fromActionFragment(actionFragment!)

    return this.add(action)
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, storeId?: string) {
    const actionFragments = yield* _await(getActionsByStore(storeId))

    return actionFragments.map((actionFragment) => {
      const action = this.actionFactory.fromActionFragment(actionFragment)

      return this.add(action)
    })
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
  create = _async(function* (this: ActionService, data: ICreateActionData) {
    const input = makeActionCreateInput(data)

    if (!input.type) {
      throw new Error('Action type must be provided')
    }

    const actionFragment = (yield* _await(
      createActionApi[input.type](input).then((res) => res.flat()),
    ))[0]

    const action = this.actionFactory.fromActionFragment(actionFragment!)

    return this.add(action)
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, action: IAction) {
    const { id } = action

    this.actions.delete(id)

    const results = yield* _await(
      deleteActionApi[action!.type]({ where: { id } }),
    )

    return action!
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
