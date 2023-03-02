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
    id,
    name,
    type,
    config: propRef(config.id),
    owner,
  })

@model('@codelab/Resource')
export class Resource
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    config: prop<Ref<IProp>>(),
    type: prop<IResourceType>(),
    owner: prop<IAuth0Owner>(),
  }))
  implements IResource
{
  static create = create

  toCreateInput(): ResourceCreateInput {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      owner: connectAuth0Owner(this.owner),
      config: {
        create: {
          node: this.config.current.toCreateInput(),
        },
      },
    }
  }

  toUpdateInput(): ResourceUpdateInput {
    return {
      name: this.name,
      type: this.type,
      config: {
        update: { node: this.config.current.toCreateInput() },
      },
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
