import React, { useEffect, useState } from 'react'
import { CyGraph } from './CyGraph'
import { CyGraphService } from './CyGraph.service'
import { ICyGraphProps } from './ICyGraphProps'

export default {
  component: CyGraph,
  title: 'CyGraph',
}

const service = new CyGraphService()

export const ShouldMoveWithDifferentParent = () => {
  const [cyGraphProps, setCyGraphProps] = useState<ICyGraphProps>({
    elements: { nodes: [], edges: [] },
  })

  useEffect(() => {
    service
      .callServerWithEndpoint('shouldMoveWithDifferentParent')
      .then((res) => {
        const { nodes } = res.data
        const { edges } = res.data

        setCyGraphProps({ elements: { nodes, edges } })
      })
  }, [])

  return (
    <CyGraph
      elements={cyGraphProps.elements}
      endpoint="shouldMoveWithDifferentParent"
    />
  )
}

export const MoveWithDifferentParentCorrectOrder = () => {
  const [cyGraphProps, setCyGraphProps] = useState<ICyGraphProps>({
    elements: { nodes: [], edges: [] },
  })

  useEffect(() => {
    service
      .callServerWithEndpoint('shouldMoveWithDiffParentCorrectOrder')
      .then((res) => {
        const { nodes } = res.data
        const { edges } = res.data

        setCyGraphProps({ elements: { nodes, edges } })
      })
  }, [])

  return (
    <CyGraph
      elements={cyGraphProps.elements}
      endpoint="shouldMoveWithDiffParentCorrectOrder"
    />
  )
}

export const ShouldMoveItemToEndOfListSameParent = () => {
  const [cyGraphProps, setCyGraphProps] = useState<ICyGraphProps>({
    elements: { nodes: [], edges: [] },
  })

  useEffect(() => {
    service
      .callServerWithEndpoint('shouldMoveItemToEndOfListSameParent')
      .then((res) => {
        const { nodes } = res.data
        const { edges } = res.data

        setCyGraphProps({ elements: { nodes, edges } })
      })
  }, [])

  return (
    <CyGraph
      elements={cyGraphProps.elements}
      endpoint="shouldMoveItemToEndOfListSameParent"
    />
  )
}

export const ShouldMoveItemToEndOfListDifferentParent = () => {
  const [cyGraphProps, setCyGraphProps] = useState<ICyGraphProps>({
    elements: { nodes: [], edges: [] },
  })

  useEffect(() => {
    service
      .callServerWithEndpoint('shouldMoveItemToEndOfListDifferentParent')
      .then((res) => {
        const { nodes } = res.data
        const { edges } = res.data

        setCyGraphProps({ elements: { nodes, edges } })
      })
  }, [])

  return (
    <CyGraph
      elements={cyGraphProps.elements}
      endpoint="shouldMoveItemToEndOfListDifferentParent"
    />
  )
}

export const ShouldMoveWithDifferentParentWithTwoChildren = () => {
  const [cyGraphProps, setCyGraphProps] = useState<ICyGraphProps>({
    elements: { nodes: [], edges: [] },
  })

  useEffect(() => {
    service
      .callServerWithEndpoint('shouldMoveWithDifferentParentWithTwoChildren')
      .then((res) => {
        const { nodes } = res.data
        const { edges } = res.data

        setCyGraphProps({ elements: { nodes, edges } })
      })
  }, [])

  return (
    <CyGraph
      elements={cyGraphProps.elements}
      endpoint="shouldMoveWithDifferentParentWithTwoChildren"
    />
  )
}
