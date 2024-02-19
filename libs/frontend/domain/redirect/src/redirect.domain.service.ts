import type {
  IRedirectDomainService,
  IRedirectModel,
} from '@codelab/frontend/abstract/domain'
import { IRedirectDTO } from '@codelab/shared/abstract/core'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RedirectModel } from './store'

@model('@codelab/RedirectDomainService')
export class RedirectDomainService
  extends Model({
    redirects: prop(() => objectMap<IRedirectModel>()),
  })
  implements IRedirectDomainService
{
  @modelAction
  hydrate({
    authGuard,
    id,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDTO) {
    let redirect = this.redirects.get(id)

    if (redirect) {
      redirect.writeCache({
        authGuard,
        source,
        targetPage,
        targetType,
        targetUrl,
      })
    } else {
      redirect = RedirectModel.create({
        authGuard,
        id,
        source,
        targetPage,
        targetType,
        targetUrl,
      })
    }

    this.redirects.set(redirect.id, redirect)

    return redirect
  }
}
