import { IResource } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { ResourceFragment } from '../graphql/resource.fragment.graphql.gen'

@model('codelab/Resource')
export class Resource
  extends Model({
    id: idProp,
    name: prop<string>(),
    config: prop<JSON>(),
  })
  implements IResource
{
  static fromFragment(resource: ResourceFragment) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      config: JSON.parse(resource.config),
    })
  }
}

export const resourceRef = rootRef<Resource>('ResourceRef', {
  onResolvedValueChange(ref, newResource, oldResource) {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
