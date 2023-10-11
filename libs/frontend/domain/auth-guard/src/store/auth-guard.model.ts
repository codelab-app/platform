import { getUserService } from '@codelab/frontend/abstract/application'
import type {
  IAuthGuardModel,
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { resourceRef } from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend/domain/prop'
import type {
  AuthGuardCreateInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  config,
  id,
  name,
  resource,
  responseTransformer,
}: IAuthGuardDTO) =>
  new AuthGuardModel({
    config: Prop.create(config),
    id,
    name,
    resource: resourceRef(resource.id),
    responseTransformer,
  })

@model('@codelab/AuthGuardModel')
export class AuthGuardModel
  extends Model(() => ({
    config: prop<IPropModel>(),
    id: idProp,
    name: prop<string>(),
    resource: prop<Ref<IResourceModel>>(),
    responseTransformer: prop<string>(),
  }))
  implements IAuthGuardModel
{
  static create = create

  @computed
  private get userService() {
    return getUserService(this)
  }

  @computed
  get toJson() {
    return {
      name: this.name,
      config: this.config.toJson,
      id: this.id,
      resource: this.resource,
      responseTransformer: this.responseTransformer,
    }
  }

  @modelAction
  writeCache({ name, resource, responseTransformer }: Partial<IAuthGuardDTO>) {
    this.name = name ?? this.name
    this.resource = resource?.id ? resourceRef(resource.id) : this.resource
    this.responseTransformer = responseTransformer ?? this.responseTransformer

    return this
  }

  toCreateInput(): AuthGuardCreateInput {
    return {
      config: {
        create: {
          node: this.config.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }

  toUpdateInput(): AuthGuardUpdateInput {
    return {
      config: {
        update: { node: this.config.toUpdateInput() },
      },
      name: this.name,
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }
}
