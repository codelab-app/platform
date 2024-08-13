import type {
  BuilderWidth,
  IBuilderService,
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeModelRef,
} from '@codelab/frontend/abstract/application'
import {
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
  isRuntimeComponent,
  isRuntimeComponentRef,
  isRuntimeElementRef,
  isRuntimePage,
  runtimeComponentRef,
  runtimeElementRef,
  runtimeModelRef,
} from '@codelab/frontend/abstract/application'
import { isComponentRef } from '@codelab/frontend/abstract/domain'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { useUserService } from '@codelab/frontend-application-user/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import { atom, useAtom } from 'jotai'
import groupBy from 'lodash/groupBy'

export const COMPONENT_TAG_NAME = 'Component'

const builderContainerWidthAtom = atom(0)
const hoveredNodeAtom = atom<Nullable<IRuntimeModelRef>>(null)
const selectedNodeAtom = atom<Nullable<IRuntimeModelRef>>(null)

const activeComponentAtom = atom(
  (get) => {
    const selectedNode = get(selectedNodeAtom)

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
  },
  // (_get, _set, _newValue) => {},
)

const activeContainerAtom = atom((get) => {
  const activeElementTree = get(activeElementTreeAtom)

  if (!activeElementTree) {
    return null
  }

  return isRuntimePage(activeElementTree)
    ? activeElementTree.page
    : activeElementTree.component
})

const activeElementTreeAtom = atom(
  (get) => {
    const selectedNode = get(selectedNodeAtom)

    if (!selectedNode) {
      return undefined
    }

    if (isRuntimeComponentRef(selectedNode)) {
      return selectedNode.current
    }

    if (isRuntimeElementRef(selectedNode)) {
      const elementTree = selectedNode.current.closestContainerNode.current

      return elementTree
    }

    return undefined
  },
  // (_get, _set, _newValue) => {},
)

export const useBuilderService = (): IBuilderService => {
  const componentService = useComponentService()

  const { atomDomainService, componentDomainService, tagDomainService } =
    useDomainStore()

  const [builderContainerWidth, setBuilderContainerWidth] = useAtom(
    builderContainerWidthAtom,
  )

  const [hoveredNode, setHoveredNode] = useAtom(hoveredNodeAtom)
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom)
  const [activeComponent] = useAtom(activeComponentAtom)
  const [activeContainer] = useAtom(activeContainerAtom)
  const [activeElementTree] = useAtom(activeElementTreeAtom)
  const userService = useUserService()

  const componentTagNames = Array.from(tagDomainService.tags.values())
    .filter((tag) => tag.name === COMPONENT_TAG_NAME)
    .flatMap((tag) => tag.children.map(({ id }) => tagDomainService.tag(id)))
    .map((tag) => tag?.name)
    .filter(isNonNullable)

  const componentsGroupedByCategory = groupBy(
    [...atomDomainService.atoms.values()].filter((component) =>
      Boolean(component.tags),
    ),
    (component) =>
      component.tags.filter(
        (tag) => tag.maybeCurrent?.name !== COMPONENT_TAG_NAME,
      )[0]?.maybeCurrent?.name ?? '',
  )

  const expandedElementTreeNodeIds = (() => {
    const preferences = userService.preferences
    const containerId = activeContainer?.id
    const treeViewNode = activeElementTree?.treeViewNode

    if (!treeViewNode || !containerId || !treeViewNode.children[0]) {
      return []
    }

    const expandedNodes = preferences.explorerExpandedNodes?.[containerId]

    if (expandedNodes?.length) {
      return expandedNodes
    }

    return isRuntimeComponent(activeElementTree)
      ? [treeViewNode.children[0]?.key]
      : [treeViewNode.key]
  })()

  const selectedBuilderBreakpoint = (() => {
    if (!activeContainer) {
      return BuilderWidthBreakPoint.None
    }

    const containerId = isComponentRef(activeContainer)
      ? activeContainer.id
      : activeContainer.current.app.id

    const appPreferences = userService.preferences.apps?.[containerId]

    if (appPreferences?.selectedBuilderBreakpoint) {
      return appPreferences.selectedBuilderBreakpoint
    }

    return BuilderWidthBreakPoint.MobilePortrait
  })()

  const selectedBuilderWidth = (() => {
    if (!activeContainer) {
      return defaultBuilderWidthBreakPoints['mobile-portrait']
    }

    const containerId = isComponentRef(activeContainer)
      ? activeContainer.id
      : activeContainer.current.app.id

    const appPreferences = userService.preferences.apps?.[containerId]

    if (appPreferences?.selectedBuilderWidth) {
      return appPreferences.selectedBuilderWidth
    }

    return defaultBuilderWidthBreakPoints['mobile-portrait']
  })()

  const hoverElementNode = (node: Nullable<IRuntimeElementModel>) => {
    if (!node) {
      setHoveredNode(null)

      return
    }

    setHoveredNode(runtimeElementRef(node))
  }

  const selectComponentNode = (node: Nullish<IRuntimeComponentModel>) => {
    if (!node) {
      return
    }

    setSelectedNode(runtimeComponentRef(node))
    updateExpandedNodes()
  }

  const selectElementNode = (node: Nullish<IRuntimeElementModel>) => {
    if (!node) {
      return
    }

    setSelectedNode(runtimeElementRef(node))
    updateExpandedNodes()
  }

  const selectPreviousElementOnDelete = () => {
    if (!selectedNode || !isRuntimeElementRef(selectedNode)) {
      setSelectedNode(null)

      return
    }

    const parent = selectedNode.current.parentElement
    const siblings = parent?.children || []
    const index = siblings.indexOf(selectedNode.current)
    const newSelectedNode = index > 0 ? siblings[index - 1] : parent

    if (!newSelectedNode) {
      throw new Error('Unable to find a new element to select')
    }

    setSelectedNode(runtimeModelRef(newSelectedNode))
  }

  const setExpandedElementTreeNodeIds = (expandedNodeIds: Array<string>) => {
    if (!activeContainer) {
      return
    }

    userService.setElementTreeExpandedKeys(activeContainer.id, expandedNodeIds)
  }

  const setSelectedBuilderBreakpoint = (breakpoint: BuilderWidthBreakPoint) => {
    if (!activeContainer) {
      return
    }

    const containerId = isComponentRef(activeContainer)
      ? activeContainer.id
      : activeContainer.current.app.id

    userService.setSelectedBuilderBreakpoint(containerId, breakpoint)
  }

  const setSelectedBuilderWidth = (width: BuilderWidth) => {
    const _selectedBuilderWidth = {
      default:
        width.default < 0
          ? Math.max(width.min, builderContainerWidth)
          : width.default,
      max:
        width.max < 0 ? Math.max(width.min, builderContainerWidth) : width.max,
      min: width.min,
    }

    if (!activeContainer) {
      return
    }

    const containerId = isComponentRef(activeContainer)
      ? activeContainer.id
      : activeContainer.current.app.id

    userService.setSelectedBuilderWidth(containerId, _selectedBuilderWidth)
  }

  const updateExpandedNodes = () => {
    if (!selectedNode) {
      return
    }

    const newNodesToExpand = findNodesToExpand(
      selectedNode,
      expandedElementTreeNodeIds,
    )

    if (newNodesToExpand.length === 0) {
      return
    }

    setExpandedElementTreeNodeIds([
      ...expandedElementTreeNodeIds,
      ...newNodesToExpand,
    ])
  }

  const findNodesToExpand = (
    node: IRuntimeModelRef,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> => {
    const pathResult = getPathFromRoot(node)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    return pathResult.filter((el) => !expandedSet.has(el))
  }

  const getPathFromRoot = (node: IRuntimeModelRef): Array<string> => {
    const path = []

    if (!isRuntimeElementRef(node)) {
      return [node.current.compositeKey]
    }

    let currentElement = node.maybeCurrent

    while (currentElement) {
      path.push(currentElement.compositeKey)
      currentElement = currentElement.parentElement
    }

    return path.reverse()
  }

  return {
    activeComponent,
    builderContainerWidth,
    componentsGroupedByCategory,
    componentTagNames,
    expandedElementTreeNodeIds,
    hoveredNode,
    hoverElementNode,
    selectComponentNode,
    selectedBuilderBreakpoint,
    selectedBuilderWidth,
    selectedNode,
    selectElementNode,
    selectPreviousElementOnDelete,
    setBuilderContainerWidth,
    setExpandedElementTreeNodeIds,
    setHoveredNode,
    setSelectedBuilderBreakpoint,
    setSelectedBuilderWidth,
    setSelectedNode,
  }
}
