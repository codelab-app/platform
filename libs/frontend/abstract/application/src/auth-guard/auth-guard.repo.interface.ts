import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import { IRepository } from '../services'
import { IAuthGuardModel } from '@codelab/frontend/abstract/domain'

export type IAuthGuardRepository = IRepository<
  IAuthGuardModel,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
>
