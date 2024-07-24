import type {
  PageFragment,
  PageOptions,
  PageWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IPageModel } from './page.model.interface'

export type IPageRepository = IRepository<
  IPageModel,
  PageFragment,
  PageWhere,
  PageOptions
>
