import type {
  IAuthGuardModel,
  IPropModel,
  IResourceModel,
  IUserModel,
} from '@codelab/frontend-abstract-domain'
import type { IAuthGuardDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import { resourceRef, userRef } from '@codelab/frontend-abstract-domain'
import { Prop } from '@codelab/frontend-domain-prop/store'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  config,
  id,
  name,
  owner,
  resource,
  responseTransformer,
}: IAuthGuardDto) =>
  new AuthGuardModel({
    config: Prop.create(config),
    id,
    name,
    owner: userRef(owner.id),
    resource: resourceRef(resource.id),
    responseTransformer,
  })

@model('@codelab/AuthGuardModel')
export class AuthGuardModel
  extends Model(() => ({
    config: prop<IPropModel>(),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUserModel>>(),
    resource: prop<Ref<IResourceModel>>(),
    responseTransformer: prop<string>(),
  }))
  implements IAuthGuardModel
{
  static create = create

  @computed
  get toJson() {
    return {
      config: this.config.toJson,
      id: this.id,
      name: this.name,
      owner: this.owner,
      resource: this.resource,
      responseTransformer: this.responseTransformer,
    }
  }

  @modelAction
  writeCache({ name, resource, responseTransformer }: Partial<IAuthGuardDto>) {
    this.name = name ?? this.name
    this.resource = resource?.id ? resourceRef(resource.id) : this.resource
    this.responseTransformer = responseTransformer ?? this.responseTransformer

    return this
  }
}
