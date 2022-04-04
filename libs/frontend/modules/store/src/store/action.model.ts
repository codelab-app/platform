import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { ActionFragment } from '../graphql/Action.fragment.v2.1.graphql.gen'

@model('codelab/Action')
export class Action extends Model({
  id: idProp,
  name: prop<string>(),
  body: prop<string>(),
  storeId: prop<string>(),
}) {
  static fromFragment(action: ActionFragment) {
    return new Action({
      body: action.body,
      name: action.name,
      id: action.id,
      storeId: action.store.id,
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
