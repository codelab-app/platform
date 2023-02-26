import type {
  IActionService,
  IApiActionConfig,
  IApiActionDTO,
  ICreateActionData,
  ICreateActionInput,
  IProp,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import {
  IActionDTO,
  IAnyAction,
  IBaseActionDTO,
} from '@codelab/frontend/abstract/core'
import { getPropService, propRef } from '@codelab/frontend/domain/prop'
import {
  getResourceService,
  resourceRef,
} from '@codelab/frontend/domain/resource'
import { getTypeService, typeRef } from '@codelab/frontend/domain/type'
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
import { Action } from 'rxjs/internal/scheduler/Action'
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
    actions: prop(() => objectMap<IAnyAction>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ActionModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    actionFactory: prop(() => new ActionFactory({})),
    selectedActions: prop(() => Array<Ref<IAnyAction>>()).withSetter(),
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
  addAction(action: IAnyAction) {
    this.actions.set(action.id, action)
  }

  @modelAction
  add(actionDTO: IActionDTO) {
    switch (actionDTO.__typename) {
      case IActionKind.CodeAction: {
        return new CodeAction({
          id: actionDTO.id,
          name: actionDTO.name,
          code: actionDTO.code,
          store: storeRef(actionDTO.store.id),
          type: IActionKind.CodeAction,
        })
      }

      case IActionKind.ApiAction: {
        return new ApiAction({
          id: actionDTO.id,
          name: actionDTO.name,
          store: storeRef(actionDTO.store.id),
          type: IActionKind.ApiAction,
          config: propRef(
            this.propService.add({
              id: actionDTO.config.id,
              api: actionDTO.config.api
                ? typeRef(this.typeService.addInterface(actionDTO.config.api))
                : undefined,
              data: JSON.stringify(actionDTO.config.data),
            }) as IProp<IApiActionConfig>,
          ),
          // TODO: Need to add resources
          resource: resourceRef(actionDTO.resource.id),
          successAction: actionDTO.successAction?.id
            ? actionRef(actionDTO.successAction.id)
            : null,
          errorAction: actionDTO.errorAction?.id
            ? actionRef(actionDTO.errorAction.id)
            : null,
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

    const actionFragments = yield* _await(
      updateActionApi[actionDTO.type](updateInput),
    )

    return actionFragments.map((actionFragment) => {
      const action = this.actionFactory.fromActionFragment(actionFragment)

      return this.add(action)
    })
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
  createSubmit = _async(function* (
    this: ActionService,
    data: Array<ICreateActionData>,
  ) {
    const input: Array<ICreateActionInput> = data.map((action) =>
      makeActionCreateInput(action),
    )

    const actionFragments = yield* _await(
      Promise.all(
        input.map((action) => {
          if (!action.type) {
            throw new Error('Action type must be provided')
          }

          return createActionApi[action.type](action)
        }),
      ).then((res) => res.flat()),
    )

    return actionFragments.map((actionFragment) => {
      const action = this.actionFactory.fromActionFragment(actionFragment)

      return this.add(action)
    })
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
