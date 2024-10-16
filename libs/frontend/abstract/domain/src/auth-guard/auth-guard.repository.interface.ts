import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export type IAuthGuardRepository = IRepository<
  IAuthGuardModel,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
> & {
  selectOptions(): Promise<Array<SelectOption>>
}
