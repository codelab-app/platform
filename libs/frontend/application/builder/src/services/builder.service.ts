import type {
  IBuilderService,
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeModelRef,
} from '@codelab/frontend/abstract/application'
import {
  BuilderWidth,
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
  getUserService,
  isRuntimeComponent,
  isRuntimeComponentRef,
  isRuntimeElementRef,
  isRuntimePage,
  RendererTab,
  runtimeComponentRef,
  runtimeElementRef,
  runtimeModelRef,
} from '@codelab/frontend/abstract/application'
import {
  getAtomDomainService,
  getTagDomainService,
  isComponentRef,
} from '@codelab/frontend/abstract/domain'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import groupBy from 'lodash/groupBy'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'

export const COMPONENT_TAG_NAME = 'Component'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTab: prop<RendererTab>(RendererTab.Page).withSetter(),
    builderContainerWidth: prop<number>(0).withSetter(),
    hoveredNode: prop<Nullable<IRuntimeModelRef>>(null).withSetter(),
    /**
     * select a node would add it to expand list
     * sometimes, it's not necessary to expand the node.
     *
     * E.g:
     *   - when deleting a node because that node needs to be expanded to delete
     *   - clear node selection
     */
    selectedNode: prop<Nullable<IRuntimeModelRef>>(null).withSetter(),
  })
  implements IBuilderService
{
  /**
   * When we select an element within a component tree, we need to know which component we're in. This allows us to find the component and return it
   */
  @computed
  get activeComponent() {
    const selectedNode = this.selectedNode

    if (!selectedNode) {
      return null
    }

    if (isRuntimeComponentRef(selectedNode)) {
      return selectedNode
    }

    if (isRuntimeElementRef(selectedNode)) {
      return isRuntimeComponentRef(selectedNode.current.closestContainerNode)
        ? selectedNode.current.closestContainerNode
        : null
    }

    return null
  }

  @computed
  get activeContainer() {
    if (!this.activeElementTree) {
      return null
    }

    return isRuntimePage(this.activeElementTree)
      ? this.activeElementTree.page
      : this.activeElementTree.component
  }

  /**
   * Based on which node is selected in the builder tree, we will display a different element tree for the rendered view
   */
  @computed
  get activeElementTree() {
    const selectedNode = this.selectedNode

    if (!selectedNode) {
      return undefined
    }

    /**
     * If we're selecting the component
     */
    if (isRuntimeComponentRef(selectedNode)) {
      return selectedNode.current
    }

    /**
     * If we're selecting an element within the component
     */
    if (isRuntimeElementRef(selectedNode)) {
      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      const elementTree = selectedNode.current.closestContainerNode.current

      return elementTree
    }

    return undefined
  }

  /**
   * Get all components that have `Component` tag
   */
  @computed
  get componentTagNames() {
    // all component tags are marked under the component tag
    return Array.from(this.tagDomainService.tags.values())
      .filter((tag) => tag.name === COMPONENT_TAG_NAME)
      .flatMap((tag) =>
        tag.children.map(({ id }) => this.tagDomainService.tag(id)),
      )
      .map((tag) => tag?.name)
      .filter(isNonNullable)
  }

  /**
   * Each component has a category tag
   */
  get componentsGroupedByCategory() {
    // atoms are internal components while components are created by users
    const components = [...this.atomDomainService.atoms.values()].filter(
      (component) => Boolean(component.tags),
    )

    return groupBy(
      components,
      (component) =>
        // Here we assume each atom only has one category tag
        component.tags.filter(
          (tag) => tag.maybeCurrent?.name !== COMPONENT_TAG_NAME,
        )[0]?.maybeCurrent?.name ?? '',
    )
  }

  @computed
  get expandedElementTreeNodeIds() {
    const preferences = this.userService.preferences
    const containerId = this.activeContainer?.id
    const treeViewNode = this.activeElementTree?.treeViewNode

    if (!treeViewNode || !containerId) {
      return []
    }

    const expandedNodes = preferences.explorerExpandedNodes?.[containerId]

    if (expandedNodes?.length) {
      return expandedNodes
    }

    return isRuntimeComponent(this.activeElementTree)
      ? [treeViewNode.children[0]!.key]
      : [treeViewNode.key]
  }

  @computed
  get selectedBuilderBreakpoint() {
    const container = this.activeContainer

    if (!container) {
      return BuilderWidthBreakPoint.None
    }

    const containerId = isComponentRef(container)
      ? container.id
      : container.current.app.id

    return (
      this.userService.preferences.apps?.[containerId]
        .selectedBuilderBreakpoint ?? BuilderWidthBreakPoint.MobilePortrait
    )
  }

  @computed
  get selectedBuilderWidth() {
    const container = this.activeContainer

    if (!container) {
      return defaultBuilderWidthBreakPoints['mobile-portrait']
    }

    const containerId = isComponentRef(container)
      ? container.id
      : container.current.app.id

    return (
      this.userService.preferences.apps?.[containerId].selectedBuilderWidth ??
      defaultBuilderWidthBreakPoints['mobile-portrait']
    )
  }

  @modelAction
  hoverElementNode(node: Nullable<IRuntimeElementModel>) {
    if (!node) {
      this.hoveredNode = null

      return
    }

    this.hoveredNode = runtimeElementRef(node)
  }

  @modelAction
  selectComponentNode(node: Nullish<IRuntimeComponentModel>) {
    if (!node) {
      return
    }

    this.selectedNode = runtimeComponentRef(node)
    this.updateExpandedNodes()
  }

  @modelAction
  selectElementNode(node: Nullish<IRuntimeElementModel>) {
    if (!node) {
      return
    }

    this.selectedNode = runtimeElementRef(node)
    this.updateExpandedNodes()
  }

  @modelAction
  selectPreviousElementOnDelete() {
    if (!this.selectedNode || !isRuntimeElementRef(this.selectedNode)) {
      this.setSelectedNode(null)

      return
    }

    const parent = this.selectedNode.current.parentElement
    const siblings = parent?.children || []
    const index = siblings.indexOf(this.selectedNode.current)
    const newSelectedNode = index > 0 ? siblings[index - 1] : parent

    if (!newSelectedNode) {
      throw new Error('Unable to find a new element to select')
    }

    this.setSelectedNode(runtimeModelRef(newSelectedNode))
  }

  @modelAction
  setExpandedElementTreeNodeIds(expandedNodeIds: Array<string>) {
    if (!this.activeContainer) {
      return
    }

    this.userService.setElementTreeExpandedKeys(
      this.activeContainer.id,
      expandedNodeIds,
    )
  }

  @modelAction
  setSelectedBuilderBreakpoint(breakpoint: BuilderWidthBreakPoint) {
    const container = this.activeContainer

    if (!container) {
      return
    }

    const containerId = isComponentRef(container)
      ? container.id
      : container.current.app.id

    this.userService.setSelectedBuilderBreakpoint(containerId, breakpoint)
  }

  @modelAction
  setSelectedBuilderWidth(width: BuilderWidth) {
    // -1 max width means fill the screen, so we use the available
    // container width as long as it's not smaller than the min
    const selectedBuilderWidth = {
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

    const container = this.activeContainer

    if (!container) {
      return
    }

    const containerId = isComponentRef(container)
      ? container.id
      : container.current.app.id

    this.userService.setSelectedBuilderWidth(containerId, selectedBuilderWidth)
  }

  @modelAction
  updateExpandedNodes = () => {
    const { expandedElementTreeNodeIds, selectedNode } = this

    if (!selectedNode) {
      return
    }

    const newNodesToExpand = this.findNodesToExpand(
      selectedNode,
      expandedElementTreeNodeIds,
    )

    if (newNodesToExpand.length === 0) {
      return
    }

    this.setExpandedElementTreeNodeIds([
      ...expandedElementTreeNodeIds,
      ...newNodesToExpand,
    ])
  }

  findNodesToExpand = (
    selectedNode: IRuntimeModelRef,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> => {
    /**
     * If we delete an element, the whole tree collapses. Instead,
     * we want to show the sibling or parent as selected.
     */
    const pathResult = this.getPathFromRoot(selectedNode)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    return pathResult.filter((el) => !expandedSet.has(el))
  }

  getPathFromRoot(selectedNode: IRuntimeModelRef): Array<string> {
    const path = []

    if (!isRuntimeElementRef(selectedNode)) {
      return [selectedNode.current.compositeKey]
    }

    let currentElement = selectedNode.maybeCurrent

    while (currentElement) {
      path.push(currentElement.compositeKey)
      currentElement = currentElement.parentElement
    }

    return path.reverse()
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get tagDomainService() {
    return getTagDomainService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
