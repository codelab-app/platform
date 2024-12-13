import type {
  IResourceConfigData,
  IResourceDto,
  IResourceType,
  IUser,
} from '@codelab/shared/abstract/core'
import type {
  ResourceCreateInput,
  ResourceDeleteInput,
  ResourceUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  getUserDomainService,
  type IPropModel,
  type IResourceModel,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend-domain-prop/store'
import { getResourceClient } from '@codelab/shared-domain-module/resource'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'

const create = ({ config, id, name, owner, type }: IResourceDto) =>
  new Resource({
    config: Prop.create(config),
    id,
    name,
    owner: userRef(owner.id),
    type,
  })

@model('@codelab/ResourceModel')
export class Resource
  extends Model(() => ({
    config: prop<IPropModel>(),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUser>>(),
    type: prop<IResourceType>(),
  }))
  implements IResourceModel
{
  static create = create

  @computed
  get client() {
    return getResourceClient(
      this.type,
      this.config.values as IResourceConfigData,
    )
  }

  @computed
  get toJson() {
    return {
      config: this.config.toJson,
      id: this.id,
      name: this.name,
      owner: this.owner,
      type: this.type,
    }
  }

  @modelAction
  writeCache({ config, name, type }: Partial<IResourceDto>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.config = config ? Prop.create(config) : this.config

    return this
  }
}
