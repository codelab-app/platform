import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService, ITag } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<ITag>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<ITag>, { tag: Maybe<ITag> }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Array<Ref<ITag>>>>(ModalService),
    props: {},
  }))
  implements IModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
