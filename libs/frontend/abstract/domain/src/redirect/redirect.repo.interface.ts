import type {
  RedirectFragment,
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IRedirectModel } from './redirect.model.interface'

export type IRedirectRepository = IRepository<
  IRedirectModel,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
>
