import type {
  IEntityModalService,
  ITagModel,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<ITagModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<ITagModel>, { tag?: ITagDTO }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<ITagModel>>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Array<Ref<ITagModel>>, { tags: Array<ITagModel> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
