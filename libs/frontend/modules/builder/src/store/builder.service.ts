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
  modelTypeKey,
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

  /**
   * When we select an element within a component tree, we need to know which component we're in. This allows us to find the component and return it
   */
  @computed
  get activeComponent() {
    if (isComponent(this.selectedNode)) {
      return this.selectedNode
    }

    /**
     * If it's an element, we need to check whether this element is part of a Component
     */
    if (isElement(this.selectedNode)) {
      const refs = getRefsResolvingTo(this.selectedNode, elementRef)

      return [...refs.values()].reduce((prev, node) => {
        const component = findParent(node, (parent: any) => {
          return parent?.[modelTypeKey] === '@codelab/Component'
        })

        return component ? component : prev
      }, null)
    }

    return null
  }

  /**
   * Based on which node is selected in the builder tree, we will display a different element tree for the rendered view
   */
  @computed
  get activeElementTree() {
    const selectedNode = this.selectedNode

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
      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      const refs = getRefsResolvingTo(selectedNode, elementRef)

      return [...refs.values()].reduce((prev, node) => {
        const elementTree = findParent(node, (parent: any) => {
          return parent?.[modelTypeKey] === '@codelab/ElementTree'
        })

        return elementTree ? elementTree : prev
      }, undefined)
    }

    return undefined
  }
}
