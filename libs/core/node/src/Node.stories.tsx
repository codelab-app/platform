import { D3Graph, D3Tree, D3TreeData } from '@codelab/d3'
import React from 'react'
import { Mapper } from '@codelab/shared/interface/node'
import { makeGraph, makeTree } from '../../tree/src/tree-factory'
import { treeMap } from '../../tree/src/tree-map'
import { componentData } from '../../tree/src/data/tree-component.data'

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
