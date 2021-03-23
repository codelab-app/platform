/* eslint-disable no-param-reassign */
import { ROOT_NODE, SerializedNodes } from '@craftjs/core'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core, EdgeDefinition, NodeDefinition } from 'cytoscape'
import { AtomType } from '../interfaces'
import { NodeA } from '../interfaces/NodeA'
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

  static craftTree(cy: Core): SerializedNodes {
    const root = cy.elements().roots().first()

    let seriazlizedNodes: SerializedNodes = {}

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any) => {
        const { id, parent, type, props } = v.data()

        const rootNodeId = root.data().id
        const craftjsId = id === rootNodeId ? ROOT_NODE : id
        const craftjsParentId = parent === rootNodeId ? ROOT_NODE : parent
        const { props: componentProps = {}, ...rest } = props

        seriazlizedNodes = {
          ...seriazlizedNodes,
          [craftjsId]: {
            type: { resolvedName: type ?? '' },
            props: componentProps,
            hidden: false,
            displayName: type ?? '',
            parent: craftjsParentId ?? '',
            isCanvas: true, // here we can specify which Components should be craftjs-canvas
            nodes: v
              .outgoers()
              .nodes()
              .map((n: any) => n.data().id),
            linkedNodes: {},
            custom: { ...rest },
          },
        }
      },
    })

    return seriazlizedNodes
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
          draggable: data.type !== AtomType.ReactRglItem,
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
