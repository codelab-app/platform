import { ModalService } from '@codelab/frontend/shared/utils'
import { IAnyAction, IEntityModalService } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/ActionModalService')
export class ActionModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAnyAction>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IAnyAction>, { action: Maybe<IAnyAction> }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
