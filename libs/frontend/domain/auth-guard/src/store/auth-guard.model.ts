import type {
  IAuthGuardModel,
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import {
  getUserService,
  propRef,
  resourceRef,
} from '@codelab/frontend/abstract/domain'
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
    config: propRef(config.id),
    id,
    name,
    resource: resourceRef(resource.id),
    responseTransformer,
  })

@model('@codelab/AuthGuardModel')
export class AuthGuardModel
  extends Model(() => ({
    config: prop<Ref<IPropModel>>(),
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
          node: this.config.current.toCreateInput(),
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
        update: { node: this.config.current.toCreateInput() },
      },
      name: this.name,
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }
}
