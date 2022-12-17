import type {
  IActionBase,
  IActionDTO,
  IStore,
} from '@codelab/frontend/abstract/core'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, prop } from 'mobx-keystone'
import { storeRef } from './store.model'

export const createBaseAction = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      id: idProp,
      name: prop<string>(),
      type: prop<T>(() => type),
      store: prop<Ref<IStore>>(),
    })
    implements Omit<IActionBase, 'createRunner'> {}

export const updateBaseAction = (self: IActionBase, data: IActionDTO) => {
  self.name = data.name
  self.store = storeRef(data.store.id)
  self.type = data.type

  return self
}
