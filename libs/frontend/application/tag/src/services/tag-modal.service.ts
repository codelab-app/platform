import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagModalService')
export class TagModalService
  extends ExtendedModel(modelClass<ModalService<ITagModel>>(ModalService), {})
  implements IEntityModalService<ITagModel, { tag?: ITagModel }>
{
  @computed
  get tag() {
    return this.metadata
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<ITagModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Array<ITagModel>, { tags?: Array<ITagModel> }>
{
  @computed
  get tags() {
    return this.metadata ?? []
  }
}
