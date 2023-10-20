import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageModalService')
export class PageModalService
  extends ExtendedModel(modelClass<ModalService<IPageModel>>(ModalService), {})
  implements IEntityModalService<IPageModel, { page?: IPageModel }>
{
  @computed
  get page() {
    return this.metadata
  }
}
