import type { IProp, IResourceModel } from '@codelab/frontend/abstract/core'
import { getUserService, propRef } from '@codelab/frontend/abstract/core'
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ config, id, name, type }: IResourceDTO) =>
  new Resource({
    config: propRef(config.id),
    id,
    name,
    type,
  })

@model('@codelab/ResourceModel')
export class Resource
  extends Model(() => ({
    config: prop<Ref<IProp>>(),
    id: idProp,
    name: prop<string>(),
    type: prop<IResourceType>(),
  }))
  implements IResourceModel
{
  static create = create

  @computed
  private get userService() {
    return getUserService(this)
  }

  toCreateInput(): ResourceCreateInput {
    return {
      config: {
        create: {
          node: this.config.current.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
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
