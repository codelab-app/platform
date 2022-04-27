import { IBuilderService } from '@codelab/shared/abstract/core'
import { autorun } from 'mobx'
import { useEffect, useState } from 'react'

export const useExpandedNodes = (builderService: IBuilderService) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<
    Array<string | number>
  >([])

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    return autorun(() => {
      if (!builderService.selectedElement) {
        return
      }

      const pathResult = builderService.builderRenderer.tree?.getPathFromRoot(
        builderService.selectedElement,
      )
      // go through each node of the path and keep track of all nodes that need to get expanded

      setExpandedNodeIds((prevState) => {
        const expandedSet = new Set(prevState)

        const toExpand = pathResult
          ?.filter((el) => !expandedSet.has(el.id))
          .map((e) => e.id)

        return [...prevState, ...(toExpand ?? [])]
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { expandedNodeIds, setExpandedNodeIds }
}
