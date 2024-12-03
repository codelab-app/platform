import type {
  IAuthGuardCreateFormData,
  IAuthGuardModel,
  IAuthGuardUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'

import type { ICrudService, IQueryService } from '../services'

export interface IAuthGuardService
  extends ICrudService<
      IRef,
      IAuthGuardCreateFormData,
      IAuthGuardUpdateFormData
    >,
    IQueryService<IAuthGuardModel, AuthGuardWhere, AuthGuardOptions> {
  createPopover: IPopover
  updatePopover: IPopover
}
