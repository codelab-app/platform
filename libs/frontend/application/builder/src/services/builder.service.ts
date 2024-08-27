import type {
  IBuilderService,
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeModel,
} from '@codelab/frontend/abstract/application'
import {
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type { BuilderWidth } from '@codelab/frontend/abstract/domain'
import {
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
  getAtomDomainService,
  getTagDomainService,
  getUserDomainService,
  isComponentRef,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import groupBy from 'lodash/groupBy'
import { computed } from 'mobx'
import { Model, model, modelAction, prop, Ref } from 'mobx-keystone'

export const COMPONENT_TAG_NAME = 'Component'

@model('@codelab/BuilderService')
export class BuilderService
  extends Model({
    builderContainerWidth: prop<number>(() => 0).withSetter(),
    hoveredNode: prop<Nullable<Ref<IRuntimeModel>>>().withSetter(),
    selectedNode: prop<Nullable<Ref<IRuntimeModel>>>().withSetter(),
  })
  implements IBuilderService
{
  @computed
  get activeComponent() {
    const selectedNode = this.selectedNode?.current

    if (!selectedNode) {
      return null
    }

    if (isRuntimeComponent(selectedNode)) {
      return selectedNode
    }

    if (isRuntimeElement(selectedNode)) {
      return isRuntimeComponent(selectedNode.closestContainerNode)
        ? selectedNode.closestContainerNode
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

  @computed
  get activeElementTree() {
    const selectedNode = this.selectedNode?.current

    if (!selectedNode) {
      return undefined
    }

    if (isRuntimeComponent(selectedNode)) {
      return selectedNode
    }

    if (isRuntimeElement(selectedNode)) {
      const elementTree = selectedNode.closestContainerNode.current

      return elementTree
    }

    return undefined
  }

  @computed
  get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  get componentTagNames() {
    return Array.from(this.tagDomainService.tags.values())
      .filter((tag) => tag.name === COMPONENT_TAG_NAME)
      .flatMap((tag) =>
        tag.children.map(({ id }) => this.tagDomainService.tag(id)),
      )
      .map((tag) => tag?.name)
      .filter(isNonNullable)
  }

  @computed
  get componentsGroupedByCategory() {
    return groupBy(
      [...this.atomDomainService.atoms.values()].filter((component) =>
        Boolean(component.tags),
      ),
      (component) =>
        component.tags.filter(
          (tag) => tag.maybeCurrent?.name !== COMPONENT_TAG_NAME,
        )[0]?.maybeCurrent?.name ?? '',
    )
  }

  @computed
  get expandedElementTreeNodeIds() {
    const treeViewNode = this.activeElementTree?.treeViewNode

    if (
      !treeViewNode ||
      !this.activeContainer?.id ||
      !treeViewNode.children[0]
    ) {
      return []
    }

    const containerPreferences = this.preferences.builder.get(
      this.activeContainer.id,
    )

    const expandedNodes = containerPreferences?.explorerExpandedNodes

    if (expandedNodes?.length) {
      return expandedNodes
    }

    return isRuntimeComponent(this.activeElementTree)
      ? [treeViewNode.children[0]?.key]
      : [treeViewNode.key]
  }

  @computed
  get preferences() {
    const user = this.userDomainService.user

    return user.preferences
  }

  @computed
  get selectedBuilderBreakpoint() {
    if (!this.activeContainer) {
      return BuilderWidthBreakPoint.None
    }

    const containerId = isComponentRef(this.activeContainer)
      ? this.activeContainer.id
      : this.activeContainer.current.app.id

    const containerPreferences = this.preferences.builder.get(containerId)

    if (containerPreferences?.breakpoint) {
      return containerPreferences.breakpoint
    }

    return BuilderWidthBreakPoint.MobilePortrait
  }

  @computed
  get selectedBuilderWidth() {
    if (!this.activeContainer) {
      return defaultBuilderWidthBreakPoints['mobile-portrait']
    }

    const containerId = isComponentRef(this.activeContainer)
      ? this.activeContainer.id
      : this.activeContainer.current.app.id

    const containerPreferences = this.preferences.builder.get(containerId)

    if (containerPreferences?.width) {
      return containerPreferences.width
    }

    return defaultBuilderWidthBreakPoints['mobile-portrait']
  }

  @computed
  get tagDomainService() {
    return getTagDomainService(this)
  }

  @computed
  get userDomainService() {
    return getUserDomainService(this)
  }

  @modelAction
  selectComponentNode(node: Nullish<Ref<IRuntimeComponentModel>>) {
    if (!node) {
      return
    }

    this.setSelectedNode(node)
    this.updateExpandedNodes()
  }

  @modelAction
  selectElementNode(node: Nullish<Ref<IRuntimeElementModel>>) {
    if (!node) {
      return
    }

    this.setSelectedNode(node)
    this.updateExpandedNodes()
  }

  @modelAction
  selectPreviousElementOnDelete() {
    const selectedNode = this.selectedNode?.current

    if (!selectedNode || !isRuntimeElement(selectedNode)) {
      this.setSelectedNode(null)

      return
    }

    const parent = selectedNode.parentElement
    const siblings = parent?.children || []
    const index = siblings.indexOf(selectedNode)
    const newSelectedNode = index > 0 ? siblings[index - 1] : parent

    if (!newSelectedNode) {
      throw new Error('Unable to find a new element to select')
    }

    this.setSelectedNode(runtimeElementRef(newSelectedNode.compositeKey))
  }

  @modelAction
  setExpandedElementTreeNodeIds(expandedNodeIds: Array<string>) {
    if (!this.activeContainer) {
      return
    }

    this.preferences.setBuilderPreference(this.activeContainer.id, {
      explorerExpandedNodes: expandedNodeIds,
    })
  }

  @modelAction
  setSelectedBuilderBreakpoint(breakpoint: BuilderWidthBreakPoint) {
    if (!this.activeContainer) {
      return
    }

    const containerId = isComponentRef(this.activeContainer)
      ? this.activeContainer.id
      : this.activeContainer.current.app.id

    this.preferences.setBuilderPreference(containerId, { breakpoint })
  }

  @modelAction
  setSelectedBuilderWidth(width: BuilderWidth) {
    const _selectedBuilderWidth = {
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

    if (!this.activeContainer) {
      return
    }

    const containerId = isComponentRef(this.activeContainer)
      ? this.activeContainer.id
      : this.activeContainer.current.app.id

    this.preferences.setBuilderPreference(containerId, {
      width: _selectedBuilderWidth,
    })
  }

  findNodesToExpand(
    node: IRuntimeModel,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> {
    const pathResult = this.getPathFromRoot(node)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    return pathResult.filter((el) => !expandedSet.has(el))
  }

  getPathFromRoot(node: IRuntimeModel): Array<string> {
    const path = []

    if (!isRuntimeElement(node)) {
      return [node.compositeKey]
    }

    let currentElement: Maybe<IRuntimeElementModel> = node

    while (currentElement) {
      path.push(currentElement.compositeKey)
      currentElement = currentElement.parentElement
    }

    return path.reverse()
  }

  updateExpandedNodes = () => {
    const selectedNode = this.selectedNode?.current

    if (!selectedNode) {
      return
    }

    const newNodesToExpand = this.findNodesToExpand(
      selectedNode,
      this.expandedElementTreeNodeIds,
    )

    if (newNodesToExpand.length === 0) {
      return
    }

    this.setExpandedElementTreeNodeIds([
      ...this.expandedElementTreeNodeIds,
      ...newNodesToExpand,
    ])
  }
}
