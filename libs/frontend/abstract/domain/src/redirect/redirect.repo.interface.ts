import type { IRedirectDto } from '@codelab/shared/abstract/core'
import type {
  RedirectFragment,
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'

export type IRedirectRepository = IRepository<
  IRedirectDto,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
>
