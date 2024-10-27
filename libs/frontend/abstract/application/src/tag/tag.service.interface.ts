import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import type { TagOptions, TagWhere } from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { ICrudService, IPaginateable, IQueryService } from '../services'

export interface ITagService
  extends ICrudService<ITagModel, ICreateTagData, IUpdateTagData>,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'>,
    IPaginateable<ITagModel> {
  checkedTags: Array<Ref<ITagModel>>
  deleteCheckedTags(): void
  setCheckedTags(tags: Array<Ref<ITagModel>>): void
}
