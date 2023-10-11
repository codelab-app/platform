import type {
  RedirectFragment,
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/abstract/codegen'
import { IRepository } from '../services'
import { IRedirectModel } from '@codelab/frontend/abstract/domain'

export type IRedirectRepository = IRepository<
  IRedirectModel,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
>
