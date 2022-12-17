import type {
  IEntityModalService,
  ITag,
  ITagDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(modelClass<ModalService<Ref<ITag>>>(ModalService), {})
  implements IEntityModalService<Ref<ITag>, { tag?: ITagDTO }>
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
  implements IEntityModalService<Array<Ref<ITag>>, { tags: Array<ITag> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
