import {
  BuilderDragData,
  BuilderTab,
  IBuilderService,
  IElement,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Frozen, Model, model, prop, Ref } from 'mobx-keystone'
import { StateModalService } from './state-modal.service'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    _selectedElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    hoveredElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    builderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),
    stateModal: prop(() => new StateModalService({})),
  })
  implements IBuilderService
{
  /**
   * Element could be a placeholder for detached elements, so can't be current
   */
  @computed
  get selectedElement() {
    return this._selectedElement?.maybeCurrent
  }
}
