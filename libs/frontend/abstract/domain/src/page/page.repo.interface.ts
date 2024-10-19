import type {
  PageCreateInput,
  PageDeleteInput,
  PageFragment,
  PageOptions,
  PageUpdateInput,
  PageWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IPageModel } from './page.model.interface'

export type IPageRepository = IRepository<
  PageCreateInput,
  PageUpdateInput,
  PageDeleteInput,
  PageFragment,
  PageWhere,
  PageOptions
>
