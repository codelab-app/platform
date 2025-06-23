import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { IAuthGuardDto } from '@codelab/shared-abstract-core'
import type {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IAuthGuardRepository = IRepository<
  IAuthGuardDto,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
> & {
  selectOptions(): Promise<Array<SelectOption>>
}
