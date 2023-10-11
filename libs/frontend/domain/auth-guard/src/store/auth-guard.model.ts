import type {
  IAuthGuardModel,
  IPropModel,
  IRedirectModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import {
  getUserService,
  isPageRef,
  isUrlRef,
  propRef,
  resourceRef,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardCreateInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectOwner,
  disconnectAll,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { getRedirect } from './redirect.field'

const create = ({
  config,
  id,
  name,
  redirect,
  resource,
  responseTransformer,
}: IAuthGuardDTO) =>
  new AuthGuardModel({
    config: propRef(config.id),
    id,
    name,
    redirect: getRedirect(redirect),
    resource: resourceRef(resource.id),
    responseTransformer,
  })

@model('@codelab/AuthGuardModel')
export class AuthGuardModel
  extends Model(() => ({
    config: prop<Ref<IPropModel>>(),
    id: idProp,
    name: prop<string>(),
    redirect: prop<IRedirectModel>(),
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
  writeCache({
    name,
    redirect,
    resource,
    responseTransformer,
  }: Partial<IAuthGuardDTO>) {
    this.name = name ?? this.name
    this.resource = resource?.id ? resourceRef(resource.id) : this.resource
    this.responseTransformer = responseTransformer ?? this.responseTransformer
    this.redirect = redirect ? getRedirect(redirect) : this.redirect

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
      redirect: {
        Page: isPageRef(this.redirect)
          ? connectNodeId(this.redirect.id)
          : undefined,
        Url: isUrlRef(this.redirect)
          ? { create: { node: this.redirect.current.toCreateInput() } }
          : undefined,
      },
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }

  toUpdateInput(): AuthGuardUpdateInput {
    // We need to disconnect the page if redirect changed to redirect url
    const redirectPage = isPageRef(this.redirect)
      ? reconnectNodeId(this.redirect.id)
      : disconnectAll()

    // We always create a new url if it is selected
    const redirectUrl = isUrlRef(this.redirect)
      ? { create: { node: this.redirect.current.toCreateInput() } }
      : {}

    return {
      config: {
        update: { node: this.config.current.toCreateInput() },
      },
      name: this.name,
      redirect: {
        Page: redirectPage,
        Url: {
          // delete any previous url node
          delete: { where: {} },
          ...redirectUrl,
        },
      },
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }
}
