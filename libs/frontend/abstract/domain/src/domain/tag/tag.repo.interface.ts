import type {
  TagFragment,
  TagOptions,
  TagWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { ITagModel } from './tag.model.interface'

export type ITagRepository = IRepository<
  ITagModel,
  TagFragment,
  TagWhere,
  TagOptions
>
