import { elementRef } from '@codelab/frontend/modules/element'
import { componentRef } from '@codelab/frontend/presenter/container'
import {
  BuilderDragData,
  BuilderTab,
  COMPONENT_NODE_TYPE,
  IBuilderDataNode,
  IBuilderService,
  IComponent,
  IElement,
  RendererTab,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Frozen, Model, model, modelAction, prop, Ref } from 'mobx-keystone'
import { StateModalService } from './state-modal.service'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    _selectedElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    activeTree: prop<RendererTab>(RendererTab.Page).withSetter(),
    hoveredElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    builderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),
    stateModal: prop(() => new StateModalService({})),
    selectedComponentRef: prop<Nullable<Ref<IComponent>>>(null).withSetter(),
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

  @modelAction
  setSelectedTreeNode(node: IBuilderDataNode) {
    this._selectedElement = elementRef(node.key.toString())

    // If this is the component container
    if (node.type === COMPONENT_NODE_TYPE) {
      this.selectedComponentRef = componentRef(node.key.toString())
    }
  }
}
