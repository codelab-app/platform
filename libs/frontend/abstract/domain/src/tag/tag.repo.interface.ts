import type {
  TagFragment,
  TagOptions,
  TagWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { ITagModel } from './tag.model.interface'

export type ITagRepository = IRepository<
  ITagModel,
  TagFragment,
  TagWhere,
  TagOptions
>
