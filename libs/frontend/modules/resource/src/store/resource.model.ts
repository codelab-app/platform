import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { PropsData } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, Ref, rootRef } from 'mobx-keystone'
import { ResourceFragment } from '../graphql/resource.fragment.graphql.gen'

@model('codelab/Resource')
export class Resource extends Model({
  id: idProp,
  name: prop<string>(),
  data: prop<PropsData>(),
  api: prop<Ref<InterfaceType>>(),
}) {
  static fromFragment(resource: ResourceFragment) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      api: typeRef(resource.api.id) as Ref<InterfaceType>,
      data: JSON.parse(resource.data),
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
