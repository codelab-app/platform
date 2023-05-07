import type {
  PageFragment,
  PageOptions,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IPage } from './page.model.interface'

export type IPageRepository = IRepository<
  IPage,
  PageFragment,
  PageWhere,
  PageOptions
>
