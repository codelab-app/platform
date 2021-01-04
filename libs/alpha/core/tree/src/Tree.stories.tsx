import React from 'react'
import { componentData } from './data'
import { makeGraph, makeTree } from './tree-factory'
import { treeMap } from './tree-map'
import { Mapper } from '@codelab/alpha/shared/interface/node'
import { D3Graph, D3Tree, D3TreeData } from '@codelab/alpha/ui/d3'

export default {
  title: 'Tree',
}

export const Tree = () => {
  const nodeTree = makeTree(componentData)

  console.log(nodeTree)

  const treeMapper: Mapper<any, D3TreeData> = (node) => {
    return {
      id: node.id,
      label: node.id,
    }
  }
  const mappedTree = treeMap<any, D3TreeData>(
    treeMapper,
    'children',
    'children',
  )(nodeTree)

  return <D3Tree data={mappedTree} />
}

export const Graph = () => {
  const nodeGraph = makeGraph(componentData)
  const { nodes, links } = nodeGraph.D3Graph

  return <D3Graph nodes={nodes} links={links} />
}
