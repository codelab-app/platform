import type { IPageDto } from '@codelab/shared/abstract/core'
import type {
  PageFragment,
  PageOptions,
  PageWhere,
} from '@codelab/shared/infra/gqlgen'

import type { IRepository } from '../shared'

export type IPageRepository = IRepository<
  IPageDto,
  PageFragment,
  PageWhere,
  PageOptions
>
