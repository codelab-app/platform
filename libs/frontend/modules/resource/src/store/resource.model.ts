import { InterfaceType, typeRef } from '@codelab/frontend/modules/type';
import { AtomType } from '@codelab/shared/abstract/core';
import { Model, model, Ref, tProp, types } from 'mobx-keystone'
import { ResourceFragment } from '../graphql/Resource.fragment.v2.1.graphql.gen';

@model('codelab/Resource')
export class Resource extends Model({
  id: tProp(types.string),
  name: tProp(types.string),
  type: tProp(types.enum(AtomType))
}) {
  static fromFragment(resource: ResourceFragment) {
    return new Resource({
      id: resource.id,
      name: resource.name,
      type: resource.atom.type,
      // api: typeRef(resource.atom.api.id) as Ref<InterfaceType>,
    })
  }

}
