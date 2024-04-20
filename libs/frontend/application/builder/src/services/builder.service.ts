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
    expandedElementTreeNodeIds: prop<Array<string>>(() => []),
    hoveredNode: prop<Nullable<IRuntimeModelRef>>(null).withSetter(),
    selectedBuilderBreakpoint: prop<BuilderWidthBreakPoint>(
      () => BuilderWidthBreakPoint.MobilePortrait,
    ).withSetter(),
    selectedBuilderWidth: prop<BuilderWidth>(
      () => defaultBuilderWidthBreakPoints['mobile-portrait'],
    ),
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
  get activeContainerId() {
    if (!this.activeElementTree) {
      return null
    }

    return isRuntimePage(this.activeElementTree)
      ? this.activeElementTree.page.id
      : this.activeElementTree.component.id
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
    const preferences = this.userPreferenceService.preferences
    const containerId = this.activeContainerId
    const treeViewNode = this.activeElementTree?.treeViewNode

    if (!treeViewNode || !containerId) {
      return []
    }

    return [
      ...(preferences.explorerExpandedNodes[containerId] ?? [treeViewNode.key]),
    ]
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
  }

  @modelAction
  selectElementNode(node: Nullish<IRuntimeElementModel>) {
    if (!node) {
      return
    }

    this.selectedNode = runtimeElementRef(node)
  }

  @modelAction
  selectPerviousElementOnDelete() {
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
    if (!this.activeContainerId) {
      return
    }

    this.userPreferenceService.setElementTreeExpandedKeys(
      this.activeContainerId,
      expandedNodeIds,
    )
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

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get tagDomainService() {
    return getTagDomainService(this)
  }

  @computed
  private get userPreferenceService() {
    return getUserService(this).userPreferenceService
  }
}
