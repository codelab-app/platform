import type {
  IAction,
  IActionService,
  IActionWhere,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import { IActionDTO } from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { ActionRepository } from '../services/action.repository'
import { ActionFactory } from './action.factory'
import { ActionModalService } from './action-modal.service'
import { ApiAction, CodeAction } from './models'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actionFactory: prop(() => new ActionFactory({})),
    actionRepository: prop(() => new ActionRepository({})),
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

  action(id: string) {
    return this.actions.get(id)
  }

  @modelAction
  add(actionDTO: IActionDTO) {
    const action =
      actionDTO.__typename === IActionKind.CodeAction
        ? CodeAction.create(actionDTO)
        : ApiAction.create(actionDTO)

    this.actions.set(action.id, action)

    return action
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: ActionService,
    actionData: IUpdateActionData,
  ) {
    if (actionData.type === IActionKind.ApiAction) {
      /**
       *
       * Create or Replace if already exist
       */
      this.propService.add({
        data: JSON.stringify(actionData.config.data),
        id: actionData.config.id,
      })
    }

    const actionDTO = this.actionFactory.fromActionData(actionData)
    /**
     *
     * Replace instead of writing cache because we may need to change from CodeAction to ApiAction and vice versa
     */
    const action = this.add(actionDTO)

    yield* _await(this.actionRepository.update(action))

    return action
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where: IActionWhere) {
    const actionFragments = yield* _await(this.actionRepository.find(where))

    return actionFragments.map((actionFragment) => {
      const action = this.actionFactory.fromActionFragment(actionFragment)

      if (action.__typename === IActionKind.ApiAction) {
        this.propService.add(action.config)
      }

      return this.add(action)
    })
  })

  @modelAction
  load(actions: Array<IActionDTO>) {
    return actions.map((action) => {
      if (action.__typename === IActionKind.ApiAction) {
        this.propService.add(action.config)
      }

      return this.add(action)
    })
  }

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
    actionData: ICreateActionData,
  ) {
    const action = this.add(this.actionFactory.fromActionData(actionData))

    if (actionData.type === IActionKind.ApiAction) {
      this.propService.add({
        data: JSON.stringify(actionData.config.data),
        id: actionData.config.id,
      })
    }

    yield* _await(this.actionRepository.add(action))

    return action
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, action: IAction) {
    const { id } = action

    this.actions.delete(id)

    yield* _await(this.actionRepository.delete(action))

    return action
  })
}
