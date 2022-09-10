import {
  IActionBase,
  IActionDTO,
  IActionKind,
} from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'

export const createBaseAction = <T extends IActionKind>(type: T) =>
  class
    extends Model({
      id: idProp,
      name: prop<string>(),
      runOnInit: prop<boolean>(),
      type: prop<T>(() => type),
      storeId: prop<string>(),
    })
    implements IActionBase {}

export const updateBaseAction = (self: IActionBase, data: IActionDTO) => {
  self.name = data.name
  self.runOnInit = data.runOnInit
  self.storeId = data.store.id
  self.type = data.type

  return self
}
