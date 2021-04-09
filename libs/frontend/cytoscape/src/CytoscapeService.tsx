/* eslint-disable no-param-reassign */
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
          /* static fromGraph({ vertices, edges }: GraphFragmentsFragment): Core {
           *   return cytoscape({
           *     headless: true,
           *     elements: {
           *       nodes: vertices.map<NodeDefinition>(
           *         ({ id, type, props, parent, styles }) => ({
           *           data: {
           *             id,
           *             parent: parent?.id,
           *             type,
           *             props,
           *             styles,
           *           },
           *         }),
           *       ),
           *       edges: edges.map<EdgeDefinition>(({ id, source, target }) => ({ */
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
