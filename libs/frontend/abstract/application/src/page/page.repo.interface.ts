import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type {
  PageFragment,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IPageRepository = IRepository<
  IPageModel,
  PageFragment,
  PageWhere,
  PageOptions
>
