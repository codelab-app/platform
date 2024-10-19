import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardUpdateInput,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export type IAuthGuardRepository = IRepository<
  AuthGuardCreateInput,
  AuthGuardUpdateInput,
  AuthGuardDeleteInput,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
> & {
  selectOptions(): Promise<Array<SelectOption>>
}
