import type {
  TagCreateInput,
  TagDeleteInput,
  TagFragment,
  TagOptions,
  TagUpdateInput,
  TagWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { ITagModel } from './tag.model.interface'

export type ITagRepository = IRepository<
  TagCreateInput,
  TagUpdateInput,
  TagDeleteInput,
  TagFragment,
  TagWhere,
  TagOptions
>
