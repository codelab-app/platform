import { IBuilderService } from '@codelab/shared/abstract/core'
import { Key, useEffect, useState } from 'react'

export type UseExpandedNodesProps = Pick<
  IBuilderService,
  'selectedElement' | 'builderRenderer'
>

/**
 * Destructured mobx classes don't work for hooks, I think it's because autorun works on objects only
 */
export const useExpandedNodes = ({
  selectedElement,
  builderRenderer,
}: UseExpandedNodesProps) => {
  const [expandedNodeIds, setExpandedNodeIds] = useState<Array<Key>>([])

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    console.log(selectedElement)

    const pathResult = selectedElement
      ? builderRenderer.tree?.getPathFromRoot(selectedElement)
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
  }, [])

  return { expandedNodeIds, setExpandedNodeIds }
}
