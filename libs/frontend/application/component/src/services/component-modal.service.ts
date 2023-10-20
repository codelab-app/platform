import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ComponentModalService')
export class ComponentModalService
  extends ExtendedModel(
    modelClass<ModalService<IComponentModel>>(ModalService),
    {},
  )
  implements
    IEntityModalService<IComponentModel, { component?: IComponentModel }>
{
  @computed
  get component() {
    return this.metadata
  }
}
