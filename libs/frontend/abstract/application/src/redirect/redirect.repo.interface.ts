import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import type {
  RedirectFragment,
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IRedirectRepository = IRepository<
  IRedirectModel,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
>
