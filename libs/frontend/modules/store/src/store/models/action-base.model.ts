import { IActionBase, IActionKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'

export const createActionBase = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      id: idProp,
      name: prop<string>(),
      runOnInit: prop<boolean>(),
      type: prop<T>(() => type),
      storeId: prop<string>(),
    })
    implements IActionBase {}
