/* eslint-disable no-param-reassign */
import { NodeId, SerializedNode, SerializedNodes } from '@craftjs/core'
import { VertexType } from '@prisma/client'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core, EdgeDefinition, NodeDefinition } from 'cytoscape'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import {
  GraphFragmentsFragment,
  VertexFragmentsFragment,
} from '@codelab/generated'

export class CytoscapeService {
  /**
   * Hydrate to cytoscape from graph data
   */
  static fromGraph({ vertices, edges }: GraphFragmentsFragment): Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: vertices.map<NodeDefinition>(({ id, type, props, parent }) => ({
          data: {
            id,
            parent: parent?.id,
            type,
            props,
          },
        })),
        edges: edges.map<EdgeDefinition>(({ id, source, target }) => ({
          data: {
            id,
            source,
            target,
          },
        })),
      },
    })
  }

  // All info on `vertex.data`
  // console.log(vertex.data(), vertex.json())
  static componentTree(cy: Core): NodeA {
    const root = cy.elements().roots().first()
    let tree: DataNode | null = null

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any, e) => {
        const node = {
          ...v.data(),
          children: [],
        }

        v._node = node

        if (tree === null) {
          tree = node
        }

        if (e) {
          const parent: any = e.source()

          parent._node.children = Array.isArray(parent._node.children)
            ? [...parent._node.children, node]
            : [node]
        }
      },
    })

    return (tree as unknown) as NodeA
  }

  static craftTree({
    vertices = [],
    edges = [],
  }: GraphFragmentsFragment): SerializedNodes {
    let rglRootVertexId = ''

    const tree = vertices.reduce(
      (_tree: SerializedNodes, vertex: VertexFragmentsFragment) => {
        if (vertex.type === VertexType.React_RGL_ResponsiveContainer) {
          rglRootVertexId = vertex.id
        }

        const node: Record<NodeId, SerializedNode> = {
          [vertex.id]: {
            type: { resolvedName: vertex.type ?? '' },
            props: vertex.props,
            hidden: false,
            displayName: vertex.type ?? '',
            parent:
              edges.find(({ target }) => target === vertex.id)?.source ?? '',
            isCanvas: false,
            nodes: edges
              .filter(({ source }) => source === vertex.id)
              .map(({ target }) => target),
            linkedNodes: {},
            custom: {
              children: edges
                .filter(({ source }) => source === vertex.id)
                .map(({ target }) => target),
            },
          },
        }

        return {
          ..._tree,
          ...node,
        }
      },
      {},
    )

    // Replace all rootVertexId with 'ROOT'
    return Object.entries(tree).reduce(
      (_tree, [key, value]: [string, SerializedNode]) => {
        let newKey = key

        if (key === rglRootVertexId) {
          newKey = 'ROOT'
        }

        return {
          ..._tree,
          [newKey]: {
            ...value,
            parent: value.parent === rglRootVertexId ? 'ROOT' : value.parent,
          },
        }
      },
      {},
    )
  }

  static antdTree(cy: Core): DataNode {
    const root = cy.elements().roots().first()
    let tree: DataNode | null = null

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any, e) => {
        const data = v.data()

        const node = {
          ...data,
          draggable: data.type !== VertexType.React_RGL_Item,
          // disabled: data.type === VertexType.React_RGL_Item,
          key: data.id,
          title: `${data.type}-${data.id.substring(0, 3)}`,
        }

        v._node = node

        if (tree === null) {
          tree = node
        }

        if (e) {
          const parent: any = e.source()

          parent._node.children = Array.isArray(parent._node.children)
            ? [...parent._node.children, node]
            : [node]
        }
      },
    })

    return (tree as unknown) as DataNode
  }
}
