import { ResourceType } from '@codelab/shared/abstract/codegen'
import {
  IGraphQLOperationConfig,
  IResource,
  IResourceDTO,
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
import {
  GraphQlOperation,
  GraphQLResource,
} from '../integrations/graphql-resource'
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
        const resource = new GraphQLResource(this.config)
        const operationConfig = o.current.config as IGraphQLOperationConfig
        const operation = new GraphQlOperation(resource, operationConfig)
        const operationName = o.current.name

        return { [operationName]: operation }
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
