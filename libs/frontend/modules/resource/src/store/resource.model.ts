import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { AtomType } from '@codelab/shared/abstract/core'
import {
  detach,
  Model,
  model,
  Ref,
  rootRef,
  tProp,
  types,
  prop,
  idProp,
} from 'mobx-keystone'
import { ResourceFragment } from '../graphql/Resource.fragment.v2.1.graphql.gen'

@model('codelab/Resource')
export class Resource extends Model({
  id: idProp,
  name: prop<string>(),
  data: prop<string>(),
  type: prop<AtomType>(),
  atom: prop<Ref<Atom>>(),
}) {
  static fromFragment(resource: ResourceFragment) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.atom.type,
      atom: atomRef(resource.atom.id),
      data: resource.data,
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
