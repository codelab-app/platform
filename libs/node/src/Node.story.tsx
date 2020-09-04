import { D3Graph, D3Tree, D3TreeData } from '@codelab/d3'
import React from 'react'
import { makeGraph, makeTree } from '../../graph/src/tree/Tree-factory'
import { Mapper } from './base/Node.i'
import { treeMap } from '../../graph/src/tree/Tree-map'
import { componentData } from '../../graph/src/tree/data/Tree-component.data'

export default {
  // component: Node,
  title: 'Node',
}

export const Tree = () => {
  const nodeTree = makeTree(componentData)

  const treeMapper: Mapper<any, D3TreeData> = (node) => {
    return {
      id: node.id,
      label: node.id,
    }
  }
  const mappedTree = treeMap<any, D3TreeData>('children', 'children')(
    treeMapper,
    nodeTree,
  )

  return <D3Tree data={mappedTree} />
}

export const Graph = () => {
  const nodeGraph = makeGraph(componentData)
  const { nodes, links } = nodeGraph.D3Graph

  return <D3Graph nodes={nodes} links={links} />
}
