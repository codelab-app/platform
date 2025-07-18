import type {
  IAuthGuardModel,
  IPageModel,
  IRedirectModel,
} from '@codelab/frontend-abstract-domain'
import type { IRedirectDto } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import { authGuardRef, pageRef } from '@codelab/frontend-abstract-domain'
import { IRedirectTargetType } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  authGuard,
  id,
  source,
  targetPage,
  targetType,
  targetUrl,
}: IRedirectDto) =>
  new RedirectModel({
    authGuard: authGuardRef(authGuard.id),
    id,
    source: pageRef(source.id),
    targetPage: targetPage ? pageRef(targetPage.id) : undefined,
    targetType,
    targetUrl,
  })

@model('@codelab/Redirect')
export class RedirectModel
  extends Model({
    authGuard: prop<Ref<IAuthGuardModel>>(),
    id: idProp,
    source: prop<Ref<IPageModel>>(),
    targetPage: prop<Nullable<Ref<IPageModel>>>(null),
    targetType: prop<IRedirectTargetType>(),
    targetUrl: prop<Nullable<string>>(null),
  })
  implements IRedirectModel
{
  static create = create

  @computed
  get toJson() {
    return {
      authGuard: this.authGuard,
      id: this.id,
      source: this.source,
      targetPage: this.targetPage,
      targetType: this.targetType,
      targetUrl: this.targetUrl,
    }
  }

  @modelAction
  writeCache({
    authGuard,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: Partial<IRedirectDto>) {
    this.source = source ? pageRef(source.id) : this.source
    this.authGuard = authGuard ? authGuardRef(authGuard.id) : this.authGuard
    this.targetType = targetType ?? this.targetType

    this.targetPage =
      this.targetType === IRedirectTargetType.Page
        ? targetPage
          ? pageRef(targetPage.id)
          : this.targetPage
        : null

    this.targetUrl =
      this.targetType === IRedirectTargetType.Url
        ? targetUrl ?? this.targetUrl
        : null

    return this
  }
}
