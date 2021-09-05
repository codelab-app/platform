import { IElementVertex } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { useEffect, useState } from 'react'

export const useExpandedNodes = (
  tree: ElementTree,
  selectedPageElement?: IElementVertex,
) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<
    Array<string | number>
  >([])

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    if (!selectedPageElement) {
      return
    }

    const expandedSet = new Set(expandedNodeIds)
    const pathResult = tree.getPathFromRoot(selectedPageElement.id)

    // If there is a path (there should always be, it's a tree after all), go through each node
    // of the path and keep track of all nodes that need to get expanded
    if (!pathResult.found) {
      return
    }

    const toExpand = pathResult.path.filter((id) => !expandedSet.has(id))
    setExpandedNodeIds((prevState) => [...prevState, ...toExpand])
  }, [selectedPageElement])

  return { expandedNodeIds, setExpandedNodeIds }
}
