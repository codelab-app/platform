import type {
  PageFragment,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IPageModel } from './page.model.interface'

export type IPageRepository = IRepository<
  IPageModel,
  PageFragment,
  PageWhere,
  PageOptions
>
