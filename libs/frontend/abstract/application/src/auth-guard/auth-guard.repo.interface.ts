import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IAuthGuardRepository = IRepository<
  IAuthGuardModel,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
>
