import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type { TagOptions, TagWhere } from '@codelab/shared/infra/gql'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICRUDService, IPaginateable, IQueryService } from '../services'

export interface ITagService
  extends ICRUDService<ITagModel, ICreateTagData, IUpdateTagData>,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'>,
    IPaginateable<ITagModel, { name?: string }> {
  checkedTags: Array<Ref<ITagModel>>
  deleteCheckedTags(): void
  setCheckedTags(tags: Array<Ref<ITagModel>>): void
}
