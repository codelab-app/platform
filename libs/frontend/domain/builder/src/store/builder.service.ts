import type {
  BuilderDragData,
  IBuilderService,
  IComponentModel,
  IDragDropData,
  IDragOverlayData,
  IElementModel,
  IPageNodeRef,
} from '@codelab/frontend/abstract/domain'
import {
  BuilderWidth,
  BuilderWidthBreakPoint,
  componentRef,
  defaultBuilderWidthBreakPoints,
  DragOverlayPosition,
  elementRef,
  IDropPosition,
  isComponentRef,
  isElementRef,
  RendererTab,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getTagService } from '@codelab/frontend/domain/tag'
import { Nullable } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import groupBy from 'lodash/groupBy'
import { computed } from 'mobx'
import type { Frozen } from 'mobx-keystone'
import { Model, model, modelAction, prop } from 'mobx-keystone'

export const COMPONENT_TAG_NAME = 'Component'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    activeTab: prop<RendererTab>(RendererTab.Page).withSetter(),
    builderContainerWidth: prop<number>(0).withSetter(),
    currentDragData: prop<Nullable<Frozen<BuilderDragData>>>(null).withSetter(),
    dragOverlayData: prop<Nullable<IDragOverlayData>>(null).withSetter(),
    expandedComponentTreeNodeIds: prop<Array<string>>(() => []).withSetter(),
    expandedPageElementTreeNodeIds: prop<Array<string>>(() => []).withSetter(),
    hoveredNode: prop<Nullable<IPageNodeRef>>(null).withSetter(),
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
    selectedNode: prop<Nullable<IPageNodeRef>>(null).withSetter(),
  })
  implements IBuilderService
{
  /**
   * When we select an element within a component tree, we need to know which component we're in. This allows us to find the component and return it
   */
  @computed
  get activeComponent() {
    const { selectedNode } = this

    if (!selectedNode) {
      return null
    }

    if (isComponentRef(selectedNode)) {
      return selectedNode
    }

    if (isElementRef(selectedNode)) {
      return selectedNode.current.parentComponent ?? null
    }

    return null
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
    if (isComponentRef(selectedNode)) {
      return selectedNode.current
    }

    /**
     * If we're selecting an element within the component
     */
    if (isElementRef(selectedNode)) {
      /**
       * Given the node, we want the reference that belongs to an ElementTree.
       */
      const elementTree = selectedNode.current.closestContainerNode

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
        )[0]?.maybeCurrent?.name ?? '',
    )
  }

  @modelAction
  dragOverElementNode(elementId: string, position: DragOverlayPosition) {
    this.dragOverlayData = {
      elementId,
      position,
    }
  }

  @modelAction
  hoverElementNode(node: Nullable<IElementModel>) {
    if (!node) {
      this.hoveredNode = null

      return
    }

    this.hoveredNode = elementRef(node)
  }

  @modelAction
  selectComponentNode(node: Nullable<IComponentModel>) {
    if (!node) {
      return
    }

    this.selectedNode = componentRef(node)
    this.updateExpandedNodes()
  }

  @modelAction
  selectElementNode(node: Nullable<IElementModel>) {
    if (!node) {
      return
    }

    this.selectedNode = elementRef(node)

    this.updateExpandedNodes()
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

  @modelAction
  updateExpandedNodes = () => {
    if (!this.selectedNode) {
      return
    }

    const newNodesToExpand = this.findNodesToExpand(
      this.selectedNode,
      this.expandedComponentTreeNodeIds,
    )

    if (this.activeTab === RendererTab.Page) {
      this.expandedPageElementTreeNodeIds = [
        ...this.expandedPageElementTreeNodeIds,
        ...newNodesToExpand,
      ]
    } else {
      this.expandedComponentTreeNodeIds = [
        ...this.expandedComponentTreeNodeIds,
        ...newNodesToExpand,
      ]
    }
  }

  findNodesToExpand = (
    selectedNode: IPageNodeRef,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> => {
    /**
     * If we delete an element, the whole tree collapses. Instead,
     * we want to show the sibling or parent as selected.
     */
    const pathResult = this.activeElementTree?.getPathFromRoot(selectedNode)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    return pathResult?.filter((el) => !expandedSet.has(el)) ?? []
  }

  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get tagService() {
    return getTagService(this)
  }
}
