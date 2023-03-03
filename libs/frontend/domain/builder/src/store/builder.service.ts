import type {
  BuilderDragData,
  IBuilderService,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import {
  BuilderWidth,
  defaultBuilderWidthBreakPoints,
  elementRef,
  isComponentPageNodeRef,
  isElementPageNodeRef,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { Element } from '@codelab/frontend/domain/element'
import { getTagService } from '@codelab/frontend/domain/tag'
import { Nullable } from '@codelab/shared/abstract/types'
import { COMPONENT_TAG_NAME } from '@codelab/shared/data/seed'
import { isNonNullable } from '@codelab/shared/utils'
import groupBy from 'lodash/groupBy'
import { computed } from 'mobx'
import type { AnyModel, Frozen } from 'mobx-keystone'
import {
  findParent,
  getRefsResolvingTo,
  Model,
  model,
  modelAction,
  modelTypeKey,
  prop,
} from 'mobx-keystone'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTree: prop<RendererTab>(RendererTab.Page).withSetter(),
    builderContainerWidth: prop<number>(0).withSetter(),
    currentBuilderWidth: prop<BuilderWidth>(
      () => defaultBuilderWidthBreakPoints.desktop,
    ),
    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),
    expandedComponentTreeNodeIds: prop<Array<string>>(() => []).withSetter(),
    expandedPageElementTreeNodeIds: prop<Array<string>>(() => []).withSetter(),
    hoveredNode: prop<Nullable<IPageNode>>(null).withSetter(),
    selectedBuilderWidth: prop<BuilderWidth>(
      () => defaultBuilderWidthBreakPoints.desktop,
    ),
    /**
     * select a node would add it to expand list
     * sometimes, it's not necessary to expand the node. E.g:
     *   - when deleting a node because that node needs to be expanded to delete
     *   - clear node selection
     */
    selectedNode: prop<Nullable<IPageNode>>(null).withSetter(),
  })
  implements IBuilderService
{
  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get tagService() {
    return getTagService(this)
  }

  /**
   * Get all components that have `Component` tag
   */
  @computed
  get componentTagNames() {
    // all component tags are marked under the component tag
    return Array.from(this.tagService.tags.values())
      .filter((tag) => tag.name === COMPONENT_TAG_NAME)
      .flatMap((tag) => tag.children.map(({ id }) => this.tagService.tag(id)))
      .map((tag) => tag?.name)
      .filter(isNonNullable)
  }

  /**
   * Each component has a category tag
   */
  get componentsGroupedByCategory() {
    // atoms are internal components while components are created by users
    const components = [...this.atomService.atoms.values()].filter(
      (component) => Boolean(component.tags),
    )

    return groupBy(
      components,
      (component) =>
        // Here we assume each atom only has one category tag
        component.tags.filter(
          (tag) => tag.maybeCurrent?.name !== COMPONENT_TAG_NAME,
        )[0]?.maybeCurrent?.name,
    )
  }

  findNodesToExpand = (
    selectedNode: IPageNode,
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
  selectComponentTreeNode(node: Nullable<IPageNode>) {
    this.selectedNode = node

    if (!node) {
      return
    }

    this.expandedComponentTreeNodeIds = [
      ...this.expandedComponentTreeNodeIds,
      ...this.findNodesToExpand(node, this.expandedComponentTreeNodeIds),
    ]
  }

  @modelAction
  selectPageElementTreeNode(node: Nullable<IPageNode>) {
    this.selectedNode = node

    if (!node) {
      return
    }

    this.expandedPageElementTreeNodeIds = [
      ...this.expandedPageElementTreeNodeIds,
      ...this.findNodesToExpand(node, this.expandedPageElementTreeNodeIds),
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
    const { selectedNode } = this

    if (isComponentPageNodeRef(selectedNode)) {
      return selectedNode
    }

    /**
     * If it's an element, we need to check whether this element is part of a Component
     */
    if (isElementPageNodeRef(selectedNode)) {
      const elementRefs = getRefsResolvingTo(selectedNode.current, elementRef)

      return [...elementRefs.values()].reduce((prev, node) => {
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
    if (isComponentPageNodeRef(selectedNode)) {
      return selectedNode.current.elementTree
    }

    /**
     * If we're selecting an element within the component
     */
    if (isElementPageNodeRef(selectedNode)) {
      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      return Element.getElementTree(selectedNode.current)
    }

    return undefined
  }

  @modelAction
  setCurrentBuilderWidth(width: BuilderWidth) {
    this.currentBuilderWidth.default = width.default
    this.currentBuilderWidth.min = width.min
    this.currentBuilderWidth.max = width.max
  }

  @modelAction
  setSelectedBuilderWidth(width: BuilderWidth) {
    // -1 max width means fill the screen, so we use the available
    // container width as long as it's not smaller than the min
    this.selectedBuilderWidth = {
      default:
        width.default < 0
          ? Math.max(width.min, this.builderContainerWidth)
          : width.default,
      max:
        width.max < 0
          ? Math.max(width.min, this.builderContainerWidth)
          : width.max,
      min: width.min,
    }
  }
}
