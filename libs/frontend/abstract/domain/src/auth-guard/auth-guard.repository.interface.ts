import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export type IAuthGuardRepository = IRepository<
  IAuthGuardModel,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
>
