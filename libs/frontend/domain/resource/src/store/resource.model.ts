import type {
  IAuth0Owner,
  IProp,
  IResource,
  IResourceConfig,
  IResourceDTO,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import type { IResourceType } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

// const hydrate = ({ id, name, type, config, owner }: IResourceDTO) =>
//   new Resource({
//     id,
//     name,
//     type,
//     config: Prop.hydrate(config) as IResourceConfig,
//     owner,
//   })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    // config: prop<IResourceConfig>(),
    config: prop<IProp>(),
    type: prop<IResourceType>(),
  }))
  implements IResource {
  // static hydrate = hydrate
}

export const resourceRef = rootRef<IResource>('@codelab/ResourceRef', {
  onResolvedValueChange: (ref, newResource, oldResource) => {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
