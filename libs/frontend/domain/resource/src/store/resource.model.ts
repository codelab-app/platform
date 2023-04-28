import type {
  IProp,
  IResource,
  IResourceDTO,
} from '@codelab/frontend/abstract/core'
import { propRef } from '@codelab/frontend/abstract/core'
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuth0Owner, IResourceType } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ config, id, name, owner, type }: IResourceDTO) =>
  new Resource({
    config: propRef(config.id),
    id,
    name,
    owner,
    type,
  })

@model('@codelab/ResourceModel')
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
  writeCache({ config, name, type }: Partial<IResourceDTO>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.config = config?.id ? propRef(config.id) : this.config

    return this
  }
}
