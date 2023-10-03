import type { TagOptions, TagWhere } from '@codelab/shared/abstract/codegen'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { LabeledValue } from 'antd/es/select'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type { ICreateTagData, IUpdateTagData } from './tag.data.interface'
import type { ITagModel } from './tag.model.interface'
import type { ITagTreeService } from './tag-tree.service.interface'

export interface ITagService
  extends Omit<
      ICRUDService<ITagModel, ICreateTagData, IUpdateTagData>,
      'delete'
    >,
    Omit<IQueryService<ITagModel, TagWhere, TagOptions>, 'getOne'>,
    Omit<
      ICRUDModalService<Ref<ITagModel>, { tag: Maybe<ITagModel> }>,
      'deleteModal'
    >,
    ICRUDFormService<Ref<ITagModel>, { tag: Maybe<ITagModel> }> {
  checkedTags: Array<Ref<ITagModel>>
  deleteManyModal: IEntityModalService<
    Array<Ref<ITagModel>>,
    { tags: Array<ITagModel> }
  >
  selectedOption: LabeledValue
  tags: ObjectMap<ITagModel>
  tagsList: Array<ITagModel>
  tagsSelectOptions: Array<LabeledValue>
  treeService: ITagTreeService

  add(tagDTO: ITagDTO): ITagModel
  delete(ids: Array<string>): Promise<number>
  deleteCheckedTags(): void
  loadTagTree(): void
  setCheckedTags(tags: Array<Ref<ITagModel>>): void
  setSelectedTag(tag: Nullish<Ref<ITagModel>>): void
  tag(id: string): Maybe<ITagModel>
}
