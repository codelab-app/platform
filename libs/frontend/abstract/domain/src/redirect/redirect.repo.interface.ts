import type { IRedirectDto } from '@codelab/shared-abstract-core'
import type {
  RedirectOptions,
  RedirectPreviewFragment,
  RedirectWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IRedirectRepository = IRepository<
  IRedirectDto,
  RedirectPreviewFragment,
  RedirectWhere,
  RedirectOptions
>
