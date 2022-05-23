import { IBuilderService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Key, useEffect, useState } from 'react'

export type UseExpandedNodesProps = Pick<IBuilderService, 'selectedNode'> & {
  elementTree: Nullable<IElementTree>
}

/**
 * Destructured mobx classes don't work for hooks, I think it's because autorun works on objects only
 */
export const useExpandedNodes = ({
  selectedNode,
  elementTree,
}: UseExpandedNodesProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<Array<Key>>([])

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    // console.log(selectedElement?.id, expandedNodeIds, prevExpandedNodeIds)

    /**
     * If we delete an element, the whole tree collapses. Instead, we want to show the sibling or parent as selected.
     */
    const pathResult = selectedNode
      ? elementTree?.getPathFromRoot(selectedNode)
      : []

    // go through each node of the path and keep track of all nodes that need to get expanded
    setExpandedNodeIds((prevState) => {
      const expandedSet = new Set(prevState)

      const toExpand = pathResult
        ?.filter((el) => !expandedSet.has(el.id))
        .map((el) => {
          return el.id
        })

      return [...prevState, ...(toExpand ?? [])]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.id])

  return { expandedNodeIds, setExpandedNodeIds }
}
