import type {
  IAuthGuardModel,
  IPageAuthGuardModel,
  IRedirectModel,
} from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import { RedirectFactory } from '@codelab/frontend/domain/redirect'
import type { PageAuthGuardCreateInput } from '@codelab/shared/abstract/codegen'
import {
  type IPageAuthGuardDTO,
  IRedirectKind,
} from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
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

    this.redirect = redirect
      ? RedirectFactory.writeCache(this.redirect, redirect)
      : this.redirect

    return this
  }

  toCreateInput(): PageAuthGuardCreateInput {
    const pageRedirect =
      this.redirect.kind === IRedirectKind.PageRedirect
        ? { create: { node: this.redirect.toCreateInput() } }
        : undefined

    const urlRedirect =
      this.redirect.kind === IRedirectKind.UrlRedirect
        ? { create: { node: this.redirect.toCreateInput() } }
        : undefined

    return {
      authGuard: connectNodeId(this.authGuard.id),
      id: this.id,
      redirect: {
        PageRedirect: pageRedirect,
        UrlRedirect: urlRedirect,
      },
    }
  }
}
