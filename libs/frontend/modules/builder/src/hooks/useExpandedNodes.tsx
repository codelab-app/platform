import { IBuilderService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { useEffect } from 'react'
import { BuilderTreeModel } from '../store/BuilderTree.model'

export type UseExpandedNodesProps = Pick<IBuilderService, 'selectedNode'> & {
  elementTree: Nullable<IElementTree>
}

const builderTreeModel = new BuilderTreeModel({ expandedNodeIds: [] })

/**
 * Destructured mobx classes don't work for hooks, I think it's because autorun works on objects only
 */
export const useExpandedNodes = ({
  selectedNode,
  elementTree,
}: UseExpandedNodesProps) => {
  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    // console.log(selectedElement?.id, expandedNodeIds, prevExpandedNodeIds)

    /**
     * If we delete an element, the whole tree collapses. Instead, we want to show the sibling or parent as selected.
     */
    const pathResult = selectedNode
      ? elementTree?.getPathFromRoot(selectedNode)
      : []

    const prevState = builderTreeModel.expandedNodeIds
    const expandedSet = new Set(prevState)

    // go through each node of the path and keep track of all nodes that need to get expanded
    const toExpand = pathResult
      ?.filter((el) => !expandedSet.has(el.id))
      .map((el) => {
        return el.id
      })

    builderTreeModel.setExpandedNodeIds([...prevState, ...(toExpand ?? [])])
  }, [selectedNode?.id])

  return {
    expandedNodeIds: builderTreeModel.expandedNodeIds,
    setExpandedNodeIds:
      builderTreeModel.setExpandedNodeIds.bind(builderTreeModel),
  }
}
