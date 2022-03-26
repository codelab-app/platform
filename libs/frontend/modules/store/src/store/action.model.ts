import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'
import { ActionFragment } from '../graphql/Action.fragment.v2.1.graphql.gen'
import { Store, storeRef } from './store.model'

@model('codelab/Action')
export class Action extends Model({
  id: idProp,
  name: prop<string>(),
  body: prop<string>(),
  store: prop<Ref<Store>>(),
}) {
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
