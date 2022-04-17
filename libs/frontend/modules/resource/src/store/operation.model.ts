import { IOperation, IOperationDTO } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('codelab/Operation')
export class Operation extends Model({
  id: idProp,
  name: prop<string>(),
  config: prop<IOperation['config']>(),
  resourceId: prop<string>(),
}) {
  static hydrate(operation: IOperationDTO) {
    return new Operation({
      id: operation.id,
      name: operation.name,
      config: JSON.parse(operation.config),
      resourceId: operation.resource.id,
    })
  }
}

export const operationRef = rootRef<Operation>('OperationRef', {
  onResolvedValueChange(ref, newOperation, oldOperation) {
    if (oldOperation && !newOperation) {
      detach(ref)
    }
  },
})
