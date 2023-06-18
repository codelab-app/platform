import type {
  IBaseAction,
  IElement,
  IStore,
} from '@codelab/frontend/abstract/core'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, prop } from 'mobx-keystone'

export const createBaseAction = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      element: prop<Maybe<Ref<IElement>>>(),
      id: idProp,
      name: prop<string>(),
      store: prop<Ref<IStore>>(),
      type: prop<T>(() => type),
    })
    implements Omit<IBaseAction, 'clone' | 'runner'> {}
