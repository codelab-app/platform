import { ComponentElementNode } from '@codelab/frontend/shared'
import { useCallback } from 'react'
import { atom, useSetRecoilState } from 'recoil'

interface NodeToElementMapStateType {
  map: Record<
    string,
    {
      element: HTMLElement
      node: ComponentElementNode
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
    (node: ComponentElementNode, element: HTMLElement) => {
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
    (node: ComponentElementNode) => (element: HTMLElement) => {
      addMapping(node, element)
    },
    [addMapping],
  )

  return { addMapping, createMappingRef }
}
