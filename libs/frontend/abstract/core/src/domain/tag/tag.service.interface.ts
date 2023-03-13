import type { TagOptions, TagWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { LabeledValue } from 'antd/es/select'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type {
  ICreateTagData,
  ITagDTO,
  IUpdateTagData,
} from './tag.dto.interface'
import type { ITag } from './tag.model.interface'
import type { ITagTreeService } from './tag-tree.service.interface'

export interface ITagService
  extends Omit<ICRUDService<ITag, ICreateTagData, IUpdateTagData>, 'delete'>,
    Omit<IQueryService<ITag, TagWhere, TagOptions>, 'getOne'>,
    Omit<ICRUDModalService<Ref<ITag>, { tag: Maybe<ITag> }>, 'deleteModal'> {
  deleteManyModal: IEntityModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
  // updateModal: IEntityModalService<Ref<ITag>, { tag?: ITag }>
  tags: ObjectMap<ITag>
  tagsList: Array<ITag>
  tagsSelectOptions: Array<LabeledValue>
  selectedOption: LabeledValue
  checkedTags: Array<Ref<ITag>>
  treeService: ITagTreeService

  delete(ids: Array<string>): Promise<number>
  loadTagTree(): void
  tag(id: string): Maybe<ITag>
  deleteCheckedTags(): void
  setSelectedTag(tag: Nullish<Ref<ITag>>): void
  setCheckedTags(tags: Array<Ref<ITag>>): void
  add(tagDTO: ITagDTO): ITag
}
