import type { ITagDto } from '@codelab/shared-abstract-core'
import type {
  TagFragment,
  TagOptions,
  TagWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type ITagRepository = IRepository<
  ITagDto,
  TagFragment,
  TagWhere,
  TagOptions
>
