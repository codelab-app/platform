import { getUserService } from '@codelab/frontend/abstract/application'
import type {
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
<<<<<<< HEAD
import { Prop } from '@codelab/frontend/domain/prop'
=======
import { getUserService, propRef } from '@codelab/frontend/abstract/domain'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IResourceConfigData,
  IResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { connectOwner, getResourceClient } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ config, id, name, type }: IResourceDTO) =>
  new Resource({
    config: Prop.create(config),
    id,
    name,
    type,
  })

@model('@codelab/ResourceModel')
export class Resource
  extends Model(() => ({
    config: prop<IPropModel>(),
    id: idProp,
    name: prop<string>(),
    type: prop<IResourceType>(),
  }))
  implements IResourceModel
{
  static create = create

  @modelAction
  writeCache({ config, name, type }: Partial<IResourceDTO>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.config = config ? Prop.create(config) : this.config

    return this
  }

  toCreateInput(): ResourceCreateInput {
    return {
      config: {
        create: {
          node: this.config.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
      type: this.type,
    }
  }

  @computed
  get toJson() {
    return {
      config: this.config.toJson,
      id: this.id,
      name: this.name,
      type: this.type,
    }
  }

  toUpdateInput(): ResourceUpdateInput {
    return {
      config: {
        update: { node: this.config.toCreateInput() },
      },
      name: this.name,
      type: this.type,
    }
  }

  @computed
  get client() {
    return getResourceClient(
      this.type,
      this.config.current.values as IResourceConfigData,
    )
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
