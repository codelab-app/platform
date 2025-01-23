import type {
  IRedirectCreateFormData,
  IRedirectModel,
  IRedirectUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type {
  IPopover,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface IRedirectService
  extends ICrudService<IRef, IRedirectCreateFormData, IRedirectUpdateFormData>,
    IQueryService<IRedirectModel, RedirectWhere, RedirectOptions> {
  createPopover: IPopover<PageContextParams, PageContextParams>
  updatePopover: IPopover<
    PageContextParams & { redirectId: string },
    PageContextParams
  >
}
