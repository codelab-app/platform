import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IModalService,
  ITag,
  ITagTreeNode,
  ITagTreeService,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Node } from './tree.service'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<ITagTreeNode>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<ITagTreeNode>, { tag?: any }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService
  extends ExtendedModel(() => ({
    baseModel:
      modelClass<
        ModalService<Array<Ref<ITagTreeNode>>, { tags: Array<ITagTreeNode> }>
      >(ModalService),
    props: {},
  }))
  implements
    IModalService<Array<Ref<ITagTreeNode>>, { tags: Array<ITagTreeNode> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
