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
} from '@codelab/frontend/abstract/application'
import type { BuilderWidth } from '@codelab/frontend/abstract/domain'
import {
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
  isComponentRef,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { isNonNullable } from '@codelab/shared/utils'
import { atom, useAtom } from 'jotai'
import groupBy from 'lodash/groupBy'

export const COMPONENT_TAG_NAME = 'Component'

const builderContainerWidthAtom = atom(0)
const hoveredNodeAtom = atom<Nullable<IRuntimeModel>>(null)
const selectedNodeAtom = atom<Nullable<IRuntimeModel>>(null)

const activeComponentAtom = atom(
  (get) => {
    const selectedNode = get(selectedNodeAtom)

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

    if (isRuntimeComponent(selectedNode)) {
      return selectedNode
    }

    if (isRuntimeElement(selectedNode)) {
      const elementTree = selectedNode.closestContainerNode.current

      return elementTree
    }

    return undefined
  },
  // (_get, _set, _newValue) => {},
)

export const useBuilderService = (): IBuilderService => {
  const [builderContainerWidth, setBuilderContainerWidth] = useAtom(
    builderContainerWidthAtom,
  )

  const { userDomainService } = useDomainStore()
  const user = userDomainService.user
  const preferences = user.preferences
  const builderPreferences = preferences.builder
  const { atomDomainService, tagDomainService } = useDomainStore()
  const [hoveredNode, setHoveredNode] = useAtom(hoveredNodeAtom)
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom)
  const [activeComponent] = useAtom(activeComponentAtom)
  const [activeContainer] = useAtom(activeContainerAtom)
  const [activeElementTree] = useAtom(activeElementTreeAtom)

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
    const treeViewNode = activeElementTree?.treeViewNode

    if (!treeViewNode || !activeContainer?.id || !treeViewNode.children[0]) {
      return []
    }

    const containerPreferences = builderPreferences.get(activeContainer.id)
    const expandedNodes = containerPreferences?.explorerExpandedNodes

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

    const containerPreferences = builderPreferences.get(containerId)

    if (containerPreferences?.breakpoint) {
      return containerPreferences.breakpoint
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

    const containerPreferences = builderPreferences.get(containerId)

    if (containerPreferences?.width) {
      return containerPreferences.width
    }

    return defaultBuilderWidthBreakPoints['mobile-portrait']
  })()

  const hoverElementNode = (node: Nullable<IRuntimeElementModel>) => {
    if (!node) {
      setHoveredNode(null)

      return
    }

    setHoveredNode(node)
  }

  const selectComponentNode = (node: Nullish<IRuntimeComponentModel>) => {
    if (!node) {
      return
    }

    setSelectedNode(node)
    updateExpandedNodes()
  }

  const selectElementNode = (node: Nullish<IRuntimeElementModel>) => {
    if (!node) {
      return
    }

    setSelectedNode(node)
    updateExpandedNodes()
  }

  const selectPreviousElementOnDelete = () => {
    if (!selectedNode || !isRuntimeElement(selectedNode)) {
      setSelectedNode(null)

      return
    }

    const parent = selectedNode.parentElement
    const siblings = parent?.children || []
    const index = siblings.indexOf(selectedNode)
    const newSelectedNode = index > 0 ? siblings[index - 1] : parent

    if (!newSelectedNode) {
      throw new Error('Unable to find a new element to select')
    }

    setSelectedNode(newSelectedNode)
  }

  const setExpandedElementTreeNodeIds = (expandedNodeIds: Array<string>) => {
    if (!activeContainer) {
      return
    }

    preferences.setBuilderPreference(activeContainer.id, {
      explorerExpandedNodes: expandedNodeIds,
    })
  }

  const setSelectedBuilderBreakpoint = (breakpoint: BuilderWidthBreakPoint) => {
    if (!activeContainer) {
      return
    }

    const containerId = isComponentRef(activeContainer)
      ? activeContainer.id
      : activeContainer.current.app.id

    preferences.setBuilderPreference(containerId, { breakpoint })
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

    preferences.setBuilderPreference(containerId, {
      width: _selectedBuilderWidth,
    })
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
    node: IRuntimeModel,
    alreadyExpandedNodeIds: Array<string>,
  ): Array<string> => {
    const pathResult = getPathFromRoot(node)
    const expandedSet = new Set(alreadyExpandedNodeIds)

    return pathResult.filter((el) => !expandedSet.has(el))
  }

  const getPathFromRoot = (node: IRuntimeModel): Array<string> => {
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
