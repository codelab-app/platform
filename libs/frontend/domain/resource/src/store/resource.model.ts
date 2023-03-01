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
import { v4 } from 'uuid'

const create = ({ id, name, type, config }: IResourceDTO) =>
  new Resource({
    id,
    name,
    type,
    config: Prop.create({ id: v4(), data: JSON.stringify(config) }),
  })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    // config: prop<IResourceConfig>(),
    config: prop<IProp>(),
    type: prop<IResourceType>(),
  }))
  implements IResource
{
  static create = create

  @modelAction
  writeCache({ id, name, config }: Partial<IResourceDTO>) {
    this.name = name ?? this.name
    // Just overwrite with new prop, since we're not using ref
    this.config = config
      ? Prop.create({ id: v4(), data: JSON.stringify(config) })
      : this.config

    return this
  }
}

export const resourceRef = rootRef<IResource>('@codelab/ResourceRef', {
  onResolvedValueChange: (ref, newResource, oldResource) => {
    if (oldResource && !newResource) {
      detach(ref)
    }
  },
})
