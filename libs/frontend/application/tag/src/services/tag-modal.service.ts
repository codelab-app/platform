import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<ITagModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<ITagModel>, { tag?: ITagModel }>
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
    IEntityModalService<Array<Ref<ITagModel>>, { tags?: Array<ITagModel> }>
{
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current)
  }
}
