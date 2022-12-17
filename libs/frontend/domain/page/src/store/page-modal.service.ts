import type {
  IEntityModalService,
  IPage,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageModalService')
export class PageModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IPage>>>(ModalService), {})
  implements IEntityModalService<Ref<IPage>, { page: Maybe<IPage> }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
