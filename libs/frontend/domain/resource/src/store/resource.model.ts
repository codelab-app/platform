import {
  getUserDomainService,
  type IPropModel,
  type IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend/domain/prop'
import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IResourceConfigData,
  IResourceDto,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { connectOwner, getResourceClient } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ config, id, name, type }: IResourceDto) =>
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
  writeCache({ config, name, type }: Partial<IResourceDto>) {
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
      owner: connectOwner(this.userDomainService.user),
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

  @computed
  get client() {
    return getResourceClient(
      this.type,
      this.config.values as IResourceConfigData,
    )
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
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
