import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService, IPage } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/PageModalService')
export class PageModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<IPage>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<IPage>, { page: Maybe<IPage> }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
