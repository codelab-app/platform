import type {
  IEntityModalService,
  IPageModel,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageModalService')
export class PageModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IPageModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IPageModel>, { page: Maybe<IPageModel> }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
