import type { IBaseAction, IStore } from '@codelab/frontend/abstract/core'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, prop } from 'mobx-keystone'

export const createBaseAction = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      id: idProp,
      name: prop<string>(),
      store: prop<Ref<IStore>>(),
      type: prop<T>(() => type),
    })
    implements Omit<IBaseAction, 'createRunner'> {}

// export const updateBaseAction = (self: IBaseAction, data: IActionDTO) => {
//   self.name = data.name
//   self.store = storeRef(data.store.id)
//   self.type = data.type

//   return self
// }
