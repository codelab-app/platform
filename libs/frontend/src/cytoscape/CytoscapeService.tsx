/* eslint-disable no-param-reassign */
import { VertexType } from '@prisma/client'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core, EdgeDefinition, NodeDefinition } from 'cytoscape'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { GraphFragmentsFragment } from '@codelab/generated'

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

  static antdTree(cy: Core): DataNode {
    const root = cy.elements().roots().first()
    let tree: DataNode | null = null

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any, e) => {
        const data = v.data()

        console.log(data.type !== VertexType.React_RGL_Item)
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
