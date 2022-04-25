import { ModalService } from '@codelab/frontend/shared/utils'
import { IApp, IModalService } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/AppModalService')
export class AppModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IApp>>>(ModalService), {})
  implements IModalService<Ref<IApp>, { app: Maybe<IApp> }>
{
  @computed
  get app() {
    return this.metadata?.current
  }
}
