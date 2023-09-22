import type {
  IBaseAction,
  IElementModel,
  IStoreModel,
} from '@codelab/frontend/abstract/core'
import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, prop } from 'mobx-keystone'

export const createBaseAction = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      element: prop<Maybe<Ref<IElementModel>>>(),
      id: idProp,
      name: prop<string>(),
      store: prop<Ref<IStoreModel>>(),
      type: prop<T>(() => type),
    })
    implements IBaseAction {}
