import type {
  IAuthGuardModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { getUserService, resourceRef } from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardCreateInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ canActivate, id, name, resource }: IAuthGuardDTO) =>
  new AuthGuardModel({
    canActivate,
    id,
    name,
    resource: resource ? resourceRef(resource.id) : null,
  })

@model('@codelab/AuthGuardModel')
export class AuthGuardModel
  extends Model(() => ({
    canActivate: prop<string>(),
    id: idProp,
    name: prop<string>(),
    resource: prop<Nullable<Ref<IResourceModel>>>(),
  }))
  implements IAuthGuardModel
{
  static create = create

  @computed
  private get userService() {
    return getUserService(this)
  }

  @modelAction
  writeCache({ canActivate, name, resource }: Partial<IAuthGuardDTO>) {
    this.canActivate = canActivate ?? this.canActivate
    this.resource = resource?.id ? resourceRef(resource.id) : this.resource
    this.name = name ?? this.name

    return this
  }

  toCreateInput(): AuthGuardCreateInput {
    return {
      canActivate: this.canActivate,
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
      resource: connectNodeId(this.resource?.id),
    }
  }

  toUpdateInput(): AuthGuardUpdateInput {
    return {
      canActivate: this.canActivate,
      name: this.name,
      resource: connectNodeId(this.resource?.id),
    }
  }
}
