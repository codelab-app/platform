import {
  _async,
  _await,
  detach,
  idProp,
  Model,
  model,
  modelFlow,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { ActionFragment } from '../graphql/Action.fragment.v2.1.graphql.gen'
import { UpdateActionInput } from '../use-cases'
import { actionApi } from './actionApi'
import { Store, storeRef } from './store.model'

@model('codelab/Action')
export class Action extends Model({
  id: idProp,
  name: prop<string>(),
  body: prop<string>(),
  store: prop<Ref<Store>>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (this: Action, input: UpdateActionInput) {
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
    return new Action({
      body: action.body,
      name: action.name,
      id: action.id,
      store: storeRef(action.store.id),
    })
  }
}

export const actionRef = rootRef<Action>('ActionRef', {
  onResolvedValueChange(ref, newAction, oldAction) {
    if (oldAction && !newAction) {
      detach(ref)
    }
  },
})
