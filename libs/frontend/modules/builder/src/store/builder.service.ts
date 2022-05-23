import { elementRef } from '@codelab/frontend/modules/element'
import {
  BuilderDragData,
  BuilderTab,
  IBuilderService,
  INode,
  isComponent,
  isElement,
  RendererTab,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  findParent,
  Frozen,
  getRefsResolvingTo,
  Model,
  model,
  prop,
  Ref,
} from 'mobx-keystone'
import { StateModalService } from './state-modal.service'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTree: prop<RendererTab>(RendererTab.Page).withSetter(),

    _selectedNode: prop<Nullable<Ref<INode>>>(null).withSetter(),
    _hoveredNode: prop<Nullable<Ref<INode>>>(null).withSetter(),

    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    activeBuilderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),
    stateModal: prop(() => new StateModalService({})),
  })
  implements IBuilderService
{
  @computed
  get selectedNode() {
    return this._selectedNode?.current ?? null
  }

  @computed
  get hoveredNode() {
    return this._hoveredNode?.current ?? null
  }

  // @modelAction
  // setSelectedTreeNode(node: IBuilderDataNode) {
  //   this._selectedNode = elementRef(node.key.toString())
  //
  //   // If this is the component container
  //   if (node.type === COMPONENT_NODE_TYPE) {
  //     this._selectedNode = componentRef(node.key.toString())
  //   }
  // }

  @computed
  get activeComponent() {
    return isComponent(this.selectedNode) ? this.selectedNode : null
  }

  /**
   * Based on which node is selected in the builder tree, we will display a different element tree for the rendered view
   */
  @computed
  get activeElementTree() {
    const selectedNode = this.selectedNode

    /**
     * Component tree
     */
    if (this.activeTree === RendererTab.Component) {
      /**
       * If we're selecting the component
       */
      if (isComponent(selectedNode)) {
        return selectedNode.elementTree
      }

      /**
       * If we're selecting an element within the component
       */
      if (isElement(selectedNode)) {
        return selectedNode.instanceOfComponent?.current.elementTree
      }
    }

    /**
     * Page tree
     */
    if (this.activeTree === RendererTab.Page) {
      // Find the element tree that it belongs to
      if (!selectedNode) {
        return undefined
      }

      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      const refs = getRefsResolvingTo(selectedNode, elementRef)

      return [...refs.values()].reduce((elementTree, node) => {
        const found = findParent(node, (parent: any) => {
          return parent?.$modelType === '@codelab/ElementTree'
        })

        return found ? found : elementTree
      }, undefined)
    }

    return undefined
  }
}
