import type {
  ITagDomainService,
  ITagModel,
} from '@codelab/frontend/abstract/domain'
import type { TagOptions, TagWhere } from '@codelab/shared/abstract/codegen'
import type {
  ICreateTagData,
  IUpdateTagData,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IPaginateable,
  IQueryService,
} from '../services'

export interface ITagService
  extends Omit<
      ICRUDService<ITagModel, ICreateTagData, IUpdateTagData>,
      'delete'
    >,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'>,
    Omit<ICRUDModalService<Ref<ITagModel>, { tag?: ITagModel }>, 'deleteModal'>,
    ICRUDFormService<Ref<ITagModel>, { tag?: ITagModel }>,
    IPaginateable<ITagModel, { name?: string }> {
  checkedTags: Array<Ref<ITagModel>>
  deleteManyModal: IEntityModalService<
    Array<Ref<ITagModel>>,
    { tags: Array<ITagModel> }
  >
  tagDomainService: ITagDomainService

  delete(ids: Array<string>): Promise<number>
  deleteCheckedTags(): void
  setCheckedTags(tags: Array<Ref<ITagModel>>): void
}
