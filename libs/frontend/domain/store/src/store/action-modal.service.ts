import type {
  IAnyAction,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

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
