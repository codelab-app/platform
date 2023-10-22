import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ActionModalService')
export class ActionModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IActionModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IActionModel>, { action?: IActionModel }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
