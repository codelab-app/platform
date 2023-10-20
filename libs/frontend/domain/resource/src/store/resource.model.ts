import { getUserService } from '@codelab/frontend/abstract/application'
import type {
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { propRef } from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend/domain/prop'
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
  private get userService() {
    return getUserService(this)
  }
}
