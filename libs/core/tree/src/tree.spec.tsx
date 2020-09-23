/* eslint-disable camelcase */
import { treeData, treeDataWithLabel } from './data'
import { makeGraph, makeTree } from './tree-factory'
import { treeMap } from './tree-map'
import { Edge, Vertex } from '@codelab/core/graph'
import { NodeEntity } from '@codelab/core/node'
import { findNode } from '@codelab/core/tree'
import { Mapper, NodeI } from '@codelab/shared/interface/node'

describe('Tree', () => {
  it('can build a tree from json', () => {
    const tree = makeTree(treeData)

    console.log(tree)

    expect(tree.id).toEqual('Root')

    const { children } = tree

    expect(children).toMatchObject([{ id: 'A' }, { id: 'E' }])

    const A = findNode('A', tree)
    const E = findNode('E', tree)

    expect(A?.children).toMatchObject([{ id: 'B' }])
    expect(E?.children).toMatchObject([{ id: 'F' }, { id: 'G' }, { id: 'H' }])

    const B = findNode('B', tree)

    expect(B?.children).toMatchObject([{ id: 'C' }, { id: 'D' }])
  })

  it('has a parent', () => {
    const tree = makeTree(treeData)
    const B = findNode('B', tree)
    const C = findNode('C', tree) as NodeEntity

    expect(C?.parent?.id).toEqual(B?.id)
  })

  it('can map a tree', () => {
    const treeMapper: Mapper<any, any> = (node: NodeI) => {
      return {
        id: node.id,
        type: node.type,
        props: {
          label: node.id as string,
        },
      }
    }

    const tree = makeTree(treeData)
    const mappedTree = treeMap(treeMapper, 'children', 'children')(tree)

    expect(mappedTree).toMatchObject(treeDataWithLabel)
  })

  it('can build a graph from json', () => {
    const graph = makeGraph(treeData)

    const Root = new Vertex({ id: 'Root' })
    const A = new Vertex({ id: 'A' })
    const B = new Vertex({ id: 'B' })
    const C = new Vertex({ id: 'C' })
    const D = new Vertex({ id: 'D' })
    const E = new Vertex({ id: 'E' })
    const F = new Vertex({ id: 'F' })
    const G = new Vertex({ id: 'G' })
    const H = new Vertex({ id: 'H' })

    expect(new Set(graph.vertices)).toMatchObject(
      new Set([Root, A, B, C, D, E, F, G, H]),
    )

    const Root_A = new Edge(Root, A)
    const Root_E = new Edge(Root, E)
    const A_B = new Edge(A, B)
    const B_C = new Edge(B, C)
    const B_D = new Edge(B, D)
    const E_F = new Edge(E, F)
    const E_G = new Edge(E, G)
    const E_H = new Edge(E, H)

    expect(new Set(graph.edges)).toEqual(
      new Set([Root_A, Root_E, A_B, B_C, B_D, E_F, E_G, E_H]),
    )
  })

  it('returns the root node with properties set', () => {
    const data: NodeI = {
      id: 'A',
      type: 'Tree',
      children: [
        {
          id: 'B',
          type: 'Tree',
        },
        { id: 'C', type: 'Tree' },
      ],
    }
    const node = makeTree(data)

    expect(node.id).toBe('A')
    expect(node.props).toStrictEqual({})
    expect(node.type).toBe('Tree')
  })

  // it('sets unique id by default', () => {
  //   const data: TreeNode = {
  //     type: 'A',
  //     children: [
  //       {
  //         type: 'B',
  //       },
  //       { type: 'C' },
  //     ],
  //   }
  //   const node = makeTree(data)
  // })

  // it('creates a Tree from an array of nodes', () => {
  //   const nodes: Array<InputNode> = [
  //     {
  //       id: 'A',
  //       childrenRef: ['B'],
  //     },
  //     {
  //       id: 'B',
  //     },
  //     {
  //       id: 'C',
  //       parentRef: 'A',
  //     },
  //     {
  //       id: 'D',
  //       parentRef: 'B',
  //     },
  //   ]
  // })
  // const root = fromNodes(nodes)
})
