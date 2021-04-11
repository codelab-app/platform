import { useCallback } from 'react'
import { atom, useSetRecoilState } from 'recoil'
import { NodeA } from '@codelab/frontend/shared'

interface NodeToElementMapStateType {
  map: Record<
    string,
    {
      element: HTMLElement
      node: NodeA
    }
  >
}

/** Stores a map of nodeId to the rendered HTMLElement */
export const nodeToElementMapState = atom<NodeToElementMapStateType>({
  key: 'nodeToElementMapState',
  default: {
    map: {},
  },
})

export const useAddNodeToElementMapping = () => {
  const setNodeToElementMap = useSetRecoilState(nodeToElementMapState)
  const addMapping = useCallback(
    (node: NodeA, element: HTMLElement) => {
      setNodeToElementMap(({ map, ...s }) => ({
        map: {
          [node.id]: {
            node,
            element,
          },
        },
        ...s,
      }))
    },
    [setNodeToElementMap],
  )

  const createMappingRef = useCallback(
    (node: NodeA) => (element: HTMLElement) => {
      addMapping(node, element)
    },
    [addMapping],
  )

  return { addMapping, createMappingRef }
}
