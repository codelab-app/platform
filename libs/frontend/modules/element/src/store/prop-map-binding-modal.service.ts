import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IEntityModalService,
  PropMapData,
  PropMapProperties,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PropMapBindingModalService')
export class PropMapBindingModalService
  extends ExtendedModel(modelClass<ModalService<PropMapData>>(ModalService), {})
  implements IEntityModalService<PropMapData, PropMapProperties>
{
  @computed
  get propMapBinding() {
    return this.metadata?.propMapBinding.current
  }

  @computed
  get element() {
    return this.metadata?.element.current
  }
}
