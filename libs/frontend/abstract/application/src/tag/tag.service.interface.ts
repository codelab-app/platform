import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type { TagOptions, TagWhere } from '@codelab/frontend/infra/gql'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICRUDService, IQueryService } from '../services'

export interface ITagService
  extends ICRUDService<ITagModel, ICreateTagData, IUpdateTagData>,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'> {
  checkedTags: Array<Ref<ITagModel>>
  deleteCheckedTags(): void
  setCheckedTags(tags: Array<Ref<ITagModel>>): void
}
