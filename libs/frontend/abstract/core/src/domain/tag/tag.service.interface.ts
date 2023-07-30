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
import type { ITag } from './tag.model.interface'
import type { ITagTreeService } from './tag-tree.service.interface'

export interface ITagService
  extends Omit<ICRUDService<ITag, ICreateTagData, IUpdateTagData>, 'delete'>,
    Omit<IQueryService<ITag, TagWhere, TagOptions>, 'getOne'>,
    Omit<ICRUDModalService<Ref<ITag>, { tag: Maybe<ITag> }>, 'deleteModal'>,
    Pick<ICRUDFormService<Ref<ITag>, { tag: Maybe<ITag> }>, 'updateForm'> {
  checkedTags: Array<Ref<ITag>>
  deleteManyModal: IEntityModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
  selectedOption: LabeledValue
  tags: ObjectMap<ITag>
  tagsList: Array<ITag>
  tagsSelectOptions: Array<LabeledValue>
  treeService: ITagTreeService

  add(tagDTO: ITagDTO): ITag
  delete(ids: Array<string>): Promise<number>
  deleteCheckedTags(): void
  loadTagTree(): void
  setCheckedTags(tags: Array<Ref<ITag>>): void
  setSelectedTag(tag: Nullish<Ref<ITag>>): void
  tag(id: string): Maybe<ITag>
}
