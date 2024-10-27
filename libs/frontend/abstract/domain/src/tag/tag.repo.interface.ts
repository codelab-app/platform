import type { ITagDto } from '@codelab/shared/abstract/core'
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
  ITagDto,
  TagFragment,
  TagWhere,
  TagOptions
>
