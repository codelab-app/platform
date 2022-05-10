import { TagGraph, TagWhere } from '@codelab/shared/abstract/codegen'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { LabeledValue } from 'antd/es/select'
import { DataNode } from 'antd/lib/tree'
import { Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { ICreateTagDTO, IUpdateTagDTO } from './tag.dto.interface'
import { ITag, ITagRef } from './tag.model.interface'
import { ITagTreeNode, ITagTreeService } from './tagtree.service.interface'

export interface ITagService
  extends Omit<
      ICRUDService<ITag, ICreateTagDTO, IUpdateTagDTO>,
      'delete' | 'update'
    >,
    Omit<IQueryService<ITag, TagWhere>, 'getOne'>,
    Omit<
      ICRUDModalService<Ref<ITagTreeNode>, { tag: Maybe<ITag> }>,
      'deleteModal' | 'updateModal'
    > {
  /**
   * Properties
   */
  update(existing: ITagTreeNode, data: IUpdateTagDTO): Promise<ITag>
  deleteManyModal: IModalService<
    Array<Ref<ITagTreeNode>>,
    { tags: Array<ITagTreeNode> }
  >
  updateModal: IModalService<Ref<ITagTreeNode>, { tag?: ITagTreeNode }>
  deleteMany(ids: Array<ITagRef>): Promise<Array<ITag>>
  tags: Array<ITag>
  tagsSelectOptions: Array<LabeledValue>
  selectedOption: LabeledValue
  deleteCheckedTags(): void
  getTagGraphs(): Promise<any>
  setSelectedTag(tag: Nullish<Ref<ITag>>): void
  setCheckedTags(tags: Array<Ref<ITag>>): void
  checkedTags: Array<Ref<ITag>>
  loadingAntdTreeDataNode: boolean
  antdTreeDataNode: Array<DataNode>
  treeService: ITagTreeService
  tagGraphs: Array<TagGraph>
}
