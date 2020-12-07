import React, { useEffect, useState } from 'react'
import { CyGraph } from './CyGraph'
import { CyGraphService } from './CyGraph.service'

export default {
  component: CyGraph,
  title: 'CyGraph',
}

const service = new CyGraphService()

export const ShouldMoveWithDifferentParent = () => {
  const [cyElements, setCyElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    service.shouldMoveWithDifferentParent().then((res) => {
      const { nodes } = res.data
      const { edges } = res.data

      setCyElements({ nodes, edges })
    })
  }, [])

  return <CyGraph nodes={cyElements.nodes} edges={cyElements.edges} />
}

export const MoveWithDifferentParentCorrectOrder = () => {
  const [cyElements, setCyElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    service.shouldMoveWithDiffParentCorrectOrder().then((res) => {
      const { nodes } = res.data
      const { edges } = res.data

      setCyElements({ nodes, edges })
    })
  }, [])

  return <CyGraph nodes={cyElements.nodes} edges={cyElements.edges} />
}

export const ShouldMoveItemToEndOfListSameParent = () => {
  const [cyElements, setCyElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    service.shouldMoveItemToEndOfListSameParent().then((res) => {
      const { nodes } = res.data
      const { edges } = res.data

      setCyElements({ nodes, edges })
    })
  }, [])

  return <CyGraph nodes={cyElements.nodes} edges={cyElements.edges} />
}

export const ShouldMoveItemToEndOfListDifferentParent = () => {
  const [cyElements, setCyElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    service.shouldMoveItemToEndOfListDifferentParent().then((res) => {
      const { nodes } = res.data
      const { edges } = res.data

      setCyElements({ nodes, edges })
    })
  }, [])

  return <CyGraph nodes={cyElements.nodes} edges={cyElements.edges} />
}

export const ShouldMoveWithDifferentParentWithTwoChildren = () => {
  const [cyElements, setCyElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    service.shouldMoveWithDifferentParentWithTwoChildren().then((res) => {
      const { nodes } = res.data
      const { edges } = res.data

      setCyElements({ nodes, edges })
    })
  }, [])

  return <CyGraph nodes={cyElements.nodes} edges={cyElements.edges} />
}
