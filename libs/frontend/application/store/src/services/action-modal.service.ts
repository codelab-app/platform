import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IActionModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ActionModalService')
export class ActionModalService
  extends ExtendedModel(
    modelClass<ModalService<IActionModel>>(ModalService),
    {},
  )
  implements IEntityModalService<IActionModel, { action?: IActionModel }>
{
  @computed
  get action() {
    return this.metadata
  }
}
