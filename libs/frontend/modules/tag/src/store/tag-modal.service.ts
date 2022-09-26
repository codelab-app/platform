import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService, ITag } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(modelClass<ModalService<Ref<ITag>>>(ModalService), {})
  implements IModalService<Ref<ITag>, { tag?: any }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<ITag>>>>(ModalService),
    {},
  )
  implements IModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
