import type {
  IAuthGuardModel,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'

import type { ICRUDService, IQueryService } from '../services'

export interface IAuthGuardService
  extends ICRUDService<
      IAuthGuardModel,
      ICreateAuthGuardData,
      IUpdateAuthGuardData
    >,
    IQueryService<IAuthGuardModel, AuthGuardWhere, AuthGuardOptions> {}
