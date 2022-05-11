import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService, ITagTreeNode } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

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
    baseModel: modelClass<ModalService<Array<Ref<ITagTreeNode>>>>(ModalService),
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
