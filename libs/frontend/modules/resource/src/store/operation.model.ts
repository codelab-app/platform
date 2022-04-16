import { IOperation, IOperationDTO } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'
import { Resource, resourceRef } from './resource.model'

@model('codelab/Operation')
export class Operation extends Model({
  id: idProp,
  name: prop<string>(),
  config: prop<IOperation['config']>(),
  resource: prop<Ref<Resource>>(),
}) {
  static fromFragment(operation: IOperationDTO) {
    return new Operation({
      id: operation.id,
      name: operation.name,
      resource: resourceRef(operation.resource.id),
      config: JSON.parse(operation.config),
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
