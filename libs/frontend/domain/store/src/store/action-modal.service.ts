import type {
  IActionModel,
  IEntityModalService,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ActionModalService')
export class ActionModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IActionModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IActionModel>, { action: Maybe<IActionModel> }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
