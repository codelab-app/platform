import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IModalService,
  PropMapData,
  PropMapProperties,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PropMapBindingModalService')
export class PropMapBindingModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<PropMapData>>(ModalService),
    props: {},
  }))
  implements IModalService<PropMapData, PropMapProperties>
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
