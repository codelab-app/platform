import type { ITagModel } from '@codelab/frontend-abstract-domain'
import type { IPopover } from '@codelab/frontend-abstract-types'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared-abstract-core'
import type { TagOptions, TagWhere } from '@codelab/shared-infra-gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface ITagService
  extends ICrudService<ITagModel, ICreateTagData, IUpdateTagData>,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'> {
  checkedTagIds: Array<string>
  createPopover: IPopover
  updatePopover: IPopover
  deleteCheckedTags(): void
  setCheckedTagIds(tags: Array<string>): void
}
