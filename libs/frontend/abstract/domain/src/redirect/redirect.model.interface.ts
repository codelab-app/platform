import type {
  RedirectCreateInput,
  RedirectDeleteInput,
  RedirectUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IRedirect,
  IRedirectDto,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAuthGuardModel } from '../auth-guard'
import type { IPageModel } from '../page'
import type { ICacheService, IModel } from '../shared'

export interface IRedirectModel
  extends Omit<
      IModel<
        RedirectCreateInput,
        RedirectUpdateInput,
        RedirectDeleteInput,
        IRedirect
      >,
      'toDeleteInput'
    >,
    ICacheService<IRedirectDto, IRedirectModel> {
  authGuard: Ref<IAuthGuardModel>
  id: string
  source: Ref<IPageModel>
  targetPage?: Nullable<Ref<IPageModel>>
  targetType: IRedirectTargetType
  targetUrl?: Nullable<string>
}

export type IRedirectRef = string
