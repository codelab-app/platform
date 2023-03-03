import type {
  IAuth0Owner,
  IProp,
  IResource,
  IResourceDTO,
} from '@codelab/frontend/abstract/core'
import { propRef } from '@codelab/frontend/domain/prop'
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceType } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({ id, name, type, config, owner }: IResourceDTO) =>
  new Resource({
    config: propRef(config.id),
    id,
    name,
    owner,
    type,
  })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    config: prop<Ref<IProp>>(),
    id: idProp,
    name: prop<string>(),
    owner: prop<IAuth0Owner>(),
    type: prop<IResourceType>(),
  }))
  implements IResource
{
  static create = create

  toCreateInput(): ResourceCreateInput {
    return {
      config: {
        create: {
          node: this.config.current.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
      type: this.type,
    }
  }

  toUpdateInput(): ResourceUpdateInput {
    return {
      config: {
        update: { node: this.config.current.toCreateInput() },
      },
      name: this.name,
      type: this.type,
    }
  }

  @modelAction
  writeCache({ name, config, type }: Partial<IResourceDTO>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.config = config?.id ? propRef(config.id) : this.config

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
