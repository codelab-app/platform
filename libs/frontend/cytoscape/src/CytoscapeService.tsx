/* eslint-disable no-param-reassign */
import { ROOT_NODE, SerializedNodes } from '@craftjs/core'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core } from 'cytoscape'
import { AtomType, NodeA } from '@codelab/frontend/shared'
import {
  RootAppPageElementFragment,
  RootAppPageLinkFragment,
} from '@codelab/hasura'

export enum CytoscapeNodeType {
  PageElement = 'PageElement',
  ComponentElement = 'ComponentElement',
}

export class CytoscapeService {
  /**
   * Hydrate to cytoscape from graph data
   */
  static fromGraph(
    elements: Array<RootAppPageElementFragment>,
    links: Array<RootAppPageLinkFragment> = [],
  ): Core {
    const nodes: Array<cytoscape.NodeDefinition> = []
    const edges: Array<cytoscape.EdgeDefinition> = []

    elements.forEach((pageElement) => {
      nodes.push({
        //Push the page element definition
        data: {
          id: pageElement.id,
          props: pageElement.props,
          label: pageElement.name,
          nodeType: CytoscapeNodeType.PageElement,
        },
      })

      pageElement.component?.elements.forEach((componentElement) => {
        //Push the component elements definitions
        nodes.push({
          data: {
            id: componentElement.id,
            parent: pageElement.id,
            nodeType: CytoscapeNodeType.ComponentElement,
            type: componentElement.atom?.type,
            label: componentElement.label,
            //TODO add props
          },
        })
      })

      pageElement.component?.links.forEach((link) => {
        edges.push({
          data: {
            id: link.id,
            source: link.source_element_id,
            target: link.target_element_id,
            props: link.props,
          },
        })
      })
    })

    links.forEach((link) => {
      edges.push({
        data: {
          id: link.id,
          source: link.source_element_id,
          target: link.target_element_id,
        },
      })
    })

    return cytoscape({
      headless: true,
      elements: {
        nodes,
        edges,
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
          title: data.label,
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
