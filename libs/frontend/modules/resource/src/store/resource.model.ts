import {
  IGraphQLOperationConfig,
  IResource,
  IResourceDTO,
  IRestOperationConfig,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { createGraphQLOperation, createRestOperation } from '../integrations'
import { Operation, operationRef } from './operation.model'

@model('codelab/Resource')
export class Resource extends Model(() => ({
  id: idProp,
  name: prop<string>(),
  config: prop<IResource['config']>(),
  type: prop<ResourceType>(),
  operations: prop<Array<Ref<Operation>>>(),
})) {
  static hydrate(resource: IResourceDTO) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      config: JSON.parse(resource.config),
      operations: resource.operations.map((x) => operationRef(x.id)),
    })
  }

  @modelAction
  toMobxObservable() {
    return this.operations
      .map((o) => {
        const { name, config, runOnInit } = o.current
        let operationInstance = null

        switch (this.type) {
          case ResourceType.GraphQL:
            operationInstance = createGraphQLOperation(
              this.config,
              config as IGraphQLOperationConfig,
              runOnInit,
            )
            break
          case ResourceType.Rest:
            operationInstance = createRestOperation(
              this.config,
              config as IRestOperationConfig,
              runOnInit,
            )
            break
          default:
            throw new Error('Resource is not integrated yet')
        }

        return { [name]: operationInstance }
      })
      .reduce(merge, {})
  }
}

export const resourceRef = rootRef<Resource>('ResourceRef', {
  onResolvedValueChange(ref, newResource, oldResource) {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
