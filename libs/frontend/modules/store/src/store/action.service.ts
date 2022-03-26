import { ModalService } from '@codelab/frontend/shared/utils'
import { ActionWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import type { CreateActionInput } from '../use-cases'
import { Action } from './action.model'
import { ActionModalService } from './action-modal.service'
import { actionApi } from './actionApi'

export type WithActionService = {
  actionService: ActionService
}

@model('codelab/ActionService')
export class ActionService extends Model({
  actions: prop(() => objectMap<Action>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new ActionModalService({})),
  deleteModal: prop(() => new ActionModalService({})),
  selectedActions: prop(() => Array<Ref<Action>>()).withSetter(),
}) {
  @computed
  get actionsList() {
    return [...this.actions.values()]
  }

  action(id: string) {
    return this.actions.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where?: ActionWhere) {
    this.actions.clear()

    const { actions } = yield* _await(actionApi.GetActions({ where }))

    return actions.map((action) => {
      const actionModel = Action.fromFragment(action)
      this.actions.set(action.id, actionModel)

      return actionModel
    })
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
  createAction = _async(function* (
    this: ActionService,
    input: CreateActionInput,
    storeId: Nullish<string>,
  ) {
    const { createActions } = yield* _await(
      actionApi.CreateActions({
        input: {
          name: input.name,
          body: input.body,
          store: { connect: { where: { node: { id: storeId } } } },
        },
      }),
    )

    const action = createActions.actions[0]

    if (!action) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Action was not created')
    }

    const actionModel = Action.fromFragment(action)

    this.actions.set(action.id, actionModel)

    return actionModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, id: string) {
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

    return deleteActions
  })
}
