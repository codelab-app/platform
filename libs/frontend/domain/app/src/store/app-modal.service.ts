import { IApp, IEntityModalService } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/AppModalService')
export class AppModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IApp>>>(ModalService), {})
  implements IEntityModalService<Ref<IApp>, { app: Maybe<IApp> }>
{
  @computed
  get app() {
    return this.metadata?.current
  }
}
