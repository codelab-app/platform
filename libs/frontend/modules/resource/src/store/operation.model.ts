import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'
import { OperationFragment } from '../graphql/operation.fragment.graphql.gen'
import { Resource, resourceRef } from './resource.model'

@model('codelab/Operation')
export class Operation extends Model({
  id: idProp,
  name: prop<string>(),
  data: prop<string>(),
  resource: prop<Ref<Resource>>(),
}) {
  static fromFragment(operation: OperationFragment) {
    return new Operation({
      id: operation.id,
      name: operation.name,
      resource: resourceRef(operation.resource.id),
      data: operation.data,
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
