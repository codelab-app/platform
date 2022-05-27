import { Prop } from '@codelab/frontend/modules/element'
import {
  IGraphQLOperationConfig,
  IResource,
  IResourceDTO,
  IResourceOperation,
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

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    config: prop<IResourceOperation>(),
    type: prop<ResourceType>(),
    operations: prop<Array<Ref<Operation>>>(),
  }))
  implements IResource
{
  static hydrate(resource: IResourceDTO) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.type,
      config: Prop.hydrate(resource.config) as IResourceOperation,
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
              this.config.data,
              config.data as IGraphQLOperationConfig,
              runOnInit,
            )
            break
          case ResourceType.Rest:
            operationInstance = createRestOperation(
              this.config.data,
              config.data as IRestOperationConfig,
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
