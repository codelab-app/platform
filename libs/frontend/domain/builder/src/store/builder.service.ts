import {
  BuilderDragData,
  BuilderTab,
  IAtomService,
  IBuilderService,
  INode,
  isComponent,
  isElement,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { Element, elementRef } from '@codelab/frontend/domain/element'
import { getTagService } from '@codelab/frontend/domain/tag'
import type { Nullable } from '@codelab/shared/abstract/types'
import { COMPONENT_TAG_NAME } from '@codelab/shared/data'
import { isNonNullable } from '@codelab/shared/utils'
// eslint-disable-next-line lodash/import-scope
import { chain } from 'lodash'
import { computed } from 'mobx'
import {
  AnyModel,
  findParent,
  Frozen,
  getRefsResolvingTo,
  Model,
  model,
  modelAction,
  modelTypeKey,
  prop,
  Ref,
} from 'mobx-keystone'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTree: prop<RendererTab>(RendererTab.Page).withSetter(),

    /**
     * select a node would add it to expand list
     * sometimes, it's not neccessary to expand the node. E.g:
     *   - when deleting a node because that node needs to be expanded to delete
     *   - clear node selection
     */
    _selectedNode: prop<Nullable<Ref<INode>>>(null).withSetter(),
    _hoveredNode: prop<Nullable<Ref<INode>>>(null).withSetter(),

    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),

    activeBuilderTab: prop<BuilderTab>(BuilderTab.Tree).withSetter(),

    expandedPageElementTreeNodeIds: prop<Array<string>>(() => []).withSetter(),
    expandedComponentTreeNodeIds: prop<Array<string>>(() => []).withSetter(),

    // configPaneWidth: prop(0),
    atomService: prop<IAtomService>(),
  })
  implements IBuilderService
{
  /**
   * Get all components that have `Component` tag
   */
  get componentTagNames() {
    const tagService = getTagService(this)

    // all component tags are marked under the component tag
    return Array.from(tagService.tags.values())
      .filter((tag) => tag.name === COMPONENT_TAG_NAME)
      .flatMap((tag) => tag.children.map(({ id }) => tagService.tag(id)))
      .map((tag) => tag?.name)
      .filter(isNonNullable)
  }

  /**
   * Each component has a category tag
   */
  get componentsGroupedByCategory() {
    // atoms are internal components while components are created by users
    return chain([...this.atomService.atoms.values()])
      .filter((component) => Boolean(component.tags))
      .groupBy(
        (component) =>
          // Here we assume each atom only has one category tag
          component.tags.filter(
            (tag) => tag.maybeCurrent?.name !== COMPONENT_TAG_NAME,
          )[0]?.maybeCurrent?.name,
      )
      .value()
  }

  @computed
  get selectedNode() {
    return this._selectedNode?.current ?? null
  }

  @computed
  get hoveredNode() {
    return this._hoveredNode?.current ?? null
  }

  findNodesToExpand = (
    selectedNode: INode,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> => {
    /**
     * If we delete an element, the whole tree collapses. Instead,
     * we want to show the sibling or parent as selected.
     */
    const pathResult = this.activeElementTree?.getPathFromRoot(selectedNode)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    // go through each node of the path and keep track of all nodes that need to get expanded
    const toExpand = pathResult
      ?.filter((el) => !expandedSet.has(el.id))
      .map((el) => {
        return el.id
      })

    return toExpand ?? []
  }

  @modelAction
  selectComponentTreeNode(node: Nullable<Ref<INode>>) {
    this._selectedNode = node

    if (!node) {
      return
    }

    this.expandedComponentTreeNodeIds = [
      ...this.expandedComponentTreeNodeIds,
      ...this.findNodesToExpand(
        node.current,
        this.expandedComponentTreeNodeIds,
      ),
    ]
  }

  @modelAction
  selectPageElementTreeNode(node: Nullable<Ref<INode>>) {
    this._selectedNode = node

    if (!node) {
      return
    }

    this.expandedPageElementTreeNodeIds = [
      ...this.expandedPageElementTreeNodeIds,
      ...this.findNodesToExpand(
        node.current,
        this.expandedPageElementTreeNodeIds,
      ),
    ]
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
        const component = findParent(node, (parent) => {
          return (parent as AnyModel)[modelTypeKey] === '@codelab/Component'
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
      return Element.getElementTree(selectedNode)
    }

    return undefined
  }
}
