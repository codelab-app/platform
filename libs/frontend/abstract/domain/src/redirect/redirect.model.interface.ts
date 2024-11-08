import type {
  IRedirect,
  IRedirectDto,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type {
  RedirectCreateInput,
  RedirectDeleteInput,
  RedirectUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IAuthGuardModel } from '../auth-guard'
import type { IPageModel } from '../page'
import type { IModel } from '../shared'

export interface IRedirectModel extends IModel<IRedirectDto, IRedirectModel> {
  authGuard: Ref<IAuthGuardModel>
  id: string
  source: Ref<IPageModel>
  targetPage?: Nullable<Ref<IPageModel>>
  targetType: IRedirectTargetType
  targetUrl?: Nullable<string>
}

export type IRedirectRef = string
