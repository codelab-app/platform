import type {
  RedirectCreateInput,
  RedirectDeleteInput,
  RedirectFragment,
  RedirectOptions,
  RedirectUpdateInput,
  RedirectWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IRedirectModel } from './redirect.model.interface'

export type IRedirectRepository = IRepository<
  RedirectCreateInput,
  RedirectUpdateInput,
  RedirectDeleteInput,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
>
