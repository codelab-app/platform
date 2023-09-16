import type {
  IComponentModel,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
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
    IEntityModalService<Ref<IComponentModel>, { component: Maybe<IComponentModel> }>
{
  @computed
  get component() {
    return this.metadata?.current
  }
}
