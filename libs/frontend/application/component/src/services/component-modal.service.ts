import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/application/shared/store'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ComponentModalService')
export class ComponentModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IComponentModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IComponentModel>, { component?: IComponentModel }>
{
  @computed
  get component() {
    return this.metadata?.current
  }
}
