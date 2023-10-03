import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type {
  TagFragment,
  TagOptions,
  TagWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type ITagRepository = IRepository<
  ITagModel,
  TagFragment,
  TagWhere,
  TagOptions
>
