import type {
  IAuthGuardModel,
  IPageAuthGuardModel,
  IRedirectModel,
} from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import { RedirectFactory } from '@codelab/frontend/domain/redirect'
import type {
  PageAuthGuardCreateInput,
  PageAuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  type IPageAuthGuardDTO,
  IRedirectKind,
} from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ authGuard, id, redirect }: IPageAuthGuardDTO) => {
  return new PageAuthGuardModel({
    authGuard: authGuardRef(authGuard.id),
    id,
    redirect: RedirectFactory.create(redirect),
  })
}

@model('@codelab/PageAuthGuardModel')
export class PageAuthGuardModel
  extends Model({
    authGuard: prop<Ref<IAuthGuardModel>>(),
    id: idProp,
    redirect: prop<IRedirectModel>(),
  })
  implements IPageAuthGuardModel
{
  static create = create

  @modelAction
  writeCache({ authGuard, redirect }: Partial<IPageAuthGuardDTO>) {
    this.authGuard = authGuard ? authGuardRef(authGuard.id) : this.authGuard

    if (redirect) {
      RedirectFactory.writeCache(this.redirect, redirect)
    }

    return this
  }

  toCreateInput(): PageAuthGuardCreateInput {
    const pageRedirect =
      this.redirect.kind === IRedirectKind.Page
        ? { create: { node: this.redirect.toCreateInput() } }
        : undefined

    const urlRedirect =
      this.redirect.kind === IRedirectKind.Url
        ? { create: { node: this.redirect.toCreateInput() } }
        : undefined

    return {
      authGuard: connectNodeId(this.id),
      id: this.id,
      redirect: {
        PageRedirect: pageRedirect,
        UrlRedirect: urlRedirect,
      },
    }
  }

  toUpdateInput(): PageAuthGuardUpdateInput {
    const pageRedirect =
      this.redirect.kind === IRedirectKind.Page
        ? { update: { node: this.redirect.toCreateInput() } }
        : undefined

    const urlRedirect =
      this.redirect.kind === IRedirectKind.Url
        ? { update: { node: this.redirect.toCreateInput() } }
        : undefined

    return {
      authGuard: reconnectNodeId(this.authGuard.id),
      redirect: {
        PageRedirect: pageRedirect,
        UrlRedirect: urlRedirect,
      },
    }
  }
}
