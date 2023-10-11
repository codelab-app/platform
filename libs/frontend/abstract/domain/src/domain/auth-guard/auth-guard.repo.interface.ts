import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export type IAuthGuardRepository = IRepository<
  IAuthGuardModel,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
>
