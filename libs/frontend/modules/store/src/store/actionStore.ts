import { ModalStore } from '@codelab/frontend/shared/utils'
import { ActionWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { ActionFragment } from '../graphql/Action.fragment.v2.1.graphql.gen'
import type { CreateActionInput, UpdateActionInput } from '../use-cases'
import { actionApi } from './actionApi'
import { StoreModel, storeRef } from './stateStore'

@model('codelab/ActionModel')
export class ActionModel extends Model({
  id: idProp,
  name: prop<string>(),
  body: prop<string>(),
  store: prop<Ref<StoreModel>>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (this: ActionModel, input: UpdateActionInput) {
    const { body, name } = input
    this.name = name
    this.body = body

    const { updateActions } = yield* _await(
      actionApi.UpdateActions({
        update: { name, body },
        where: { id: this.id },
      }),
    )

    const action = updateActions?.actions[0]

    if (!action) {
      throw new Error('Failed to update action')
    }

    this.name = action.name
    this.body = action.body

    return action
  })

  static fromFragment(action: ActionFragment) {
    return new ActionModel({
      body: action.body,
      name: action.name,
      id: action.id,
      store: storeRef(action.store.id),
    })
  }
}

export const actionRef = rootRef<ActionModel>('ActionRef', {
  onResolvedValueChange(ref, newAction, oldAction) {
    if (oldAction && !newAction) {
      detach(ref)
    }
  },
})

@model('codelab/ActionModalStore')
class ActionModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Ref<ActionModel>>>(ModalStore),
  props: {},
})) {
  @computed
  get action() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/ActionsModalStore')
class ActionsModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Array<Ref<ActionModel>>>>(ModalStore),
  props: {},
})) {
  @computed
  get actions() {
    return this.metadata?.map((a) => a.current) ?? null
  }
}

@model('codelab/ActionStore')
export class ActionStore extends Model({
  actions: prop(() => objectMap<ActionModel>()),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new ActionModalStore({})),
  deleteModal: prop(() => new ActionsModalStore({})),
  selectedActions: prop(() => Array<Ref<ActionModel>>()).withSetter(),
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
  getAll = _async(function* (this: ActionStore, where?: ActionWhere) {
    const { actions } = yield* _await(actionApi.GetActions({ where }))

    return actions.map((action) => {
      if (this.actions.get(action.id)) {
        return this.actions.get(action.id)
      } else {
        const actionModel = ActionModel.fromFragment(action)
        this.actions.set(action.id, actionModel)

        return actionModel
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionStore, id: string) {
    return this.actions.has(id)
      ? this.actions.get(id)
      : (yield* _await(this.getAll({ id })))[0]
  })

  @modelFlow
  @transaction
  createAction = _async(function* (
    this: ActionStore,
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

    const actionModel = ActionModel.fromFragment(action)

    this.actions.set(actionModel.id, actionModel)

    return actionModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionStore, ids: Array<string>) {
    for (const id of ids) {
      if (this.actions.has(id)) {
        this.actions.delete(id)
      }
    }

    const { deleteActions } = yield* _await(
      actionApi.DeleteActions({ where: { id_IN: ids } }),
    )

    if (deleteActions.nodesDeleted === 0) {
      // throw error so that the actionic middleware rolls back the changes
      throw new Error('Action was not deleted')
    }

    return deleteActions
  })
}
