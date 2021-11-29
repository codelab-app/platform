import { ElementTree } from '@codelab/shared/core'
import { useEffect, useState } from 'react'
import { useBuilderSelectedElement } from './useBuilderSelectedElement'

export const useExpandedNodes = (tree: ElementTree) => {
  const { selectedElementId } = useBuilderSelectedElement()

  const [expandedNodeIds, setExpandedNodeIds] = useState<
    Array<string | number>
  >([])

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    if (!selectedElementId) {
      return
    }

    const pathResult = tree.getPathFromRoot(selectedElementId)

    // If there is a path (there should always be, it's a tree after all), go through each node
    // of the path and keep track of all nodes that need to get expanded
    if (!pathResult.found) {
      return
    }

    setExpandedNodeIds((prevState) => {
      const expandedSet = new Set(prevState)
      const toExpand = pathResult.path?.filter((id) => !expandedSet.has(id))

      return [...prevState, ...(toExpand ?? [])]
    })
  }, [tree, selectedElementId])

  return { expandedNodeIds, setExpandedNodeIds }
}
