import { TagWhere } from '@codelab/shared/abstract/codegen'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { LabeledValue } from 'antd/es/select'
import { Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { ICreateTagDTO, IUpdateTagDTO } from './tag.dto.interface'
import { ITag, ITagRef } from './tag.model.interface'

export interface ITagService
  extends Omit<ICRUDService<ITag, ICreateTagDTO, IUpdateTagDTO>, 'delete'>,
    Omit<IQueryService<ITag, TagWhere>, 'getOne'>,
    Omit<ICRUDModalService<Ref<ITag>, { tag: Maybe<ITag> }>, 'deleteModal'> {
  /**
   * Properties
   */
  deleteManyModal: IModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
  deleteMany(ids: Array<ITagRef>): Promise<Array<ITag>>
  tags: Array<ITag>
  tagsSelectOptions: Array<LabeledValue>
  selectedOption: LabeledValue
  deleteCheckedTags(): void
  getTagGraphs(): Promise<any>
  setSelectedTag(tag: Nullish<Ref<ITag>>): void
  setCheckedTags(tags: Array<Ref<ITag>>): void
  checkedTags: Array<Ref<ITag>>
}
