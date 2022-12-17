import type {
  IComponent,
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
    modelClass<ModalService<Ref<IComponent>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IComponent>, { component: Maybe<IComponent> }>
{
  @computed
  get component() {
    return this.metadata?.current
  }
}
