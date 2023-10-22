import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageModalService')
export class PageModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IPageModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IPageModel>, { page?: IPageModel }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}