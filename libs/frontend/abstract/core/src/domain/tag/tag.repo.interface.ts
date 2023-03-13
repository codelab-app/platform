import type { TagWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type {
  TagFragment,
  TagPreviewFragment,
} from './tag.fragment.graphql.gen'
import type { ITag } from './tag.model.interface'

export type ITagRepository = IRepository<
  ITag,
  TagFragment | TagPreviewFragment,
  TagWhere
>
