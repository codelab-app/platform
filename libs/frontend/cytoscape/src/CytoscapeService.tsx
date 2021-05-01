/* eslint-disable no-param-reassign */
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core } from 'cytoscape'
import {
  AtomType,
  ComponentElementNode,
  ComponentRootNode,
  CytoscapeNode,
  NodeType,
  PageElementNode,
  PageRootNode,
} from '@codelab/frontend/shared'
import { propDataEntityToModel } from '@codelab/modules/prop'
import {
  App__PageFragment,
  AtomFragment,
  PageElement__ComponentFragment,
} from '@codelab/hasura'

export const pageComponentElementNodeId = (
  pageElementId: string,
  componentElementId: string,
) => `${pageElementId}--${componentElementId}`

export class CytoscapeService {
  /** Adds a root node, takes all root-level nodes and makes them children to the new root node */
  static toSingleRoot(
    cy: Core,
    rootNodeData: { id: string; [key: string]: any },
  ) {
    const rootNode = cy.add({
      group: 'nodes',
      data: {
        ...rootNodeData,
      },
    })

    cy.add(
      cy
        .elements()
        .roots()
        .map((element) => ({
          group: 'edges',
          data: {
            id: 'root_edge_' + element.id(),
            source: rootNode.id(),
            target: element.id(),
          },
        })),
    )

    return cy
  }

  /** Processes a Page to form a tree of page elements with a single page root node at the top */
  static fromPage({
    elements: pageElements,
    links: pageLinks,
    id: pageId,
    name: pageName,
  }: App__PageFragment): Core {
    const pageElementsGraph = cytoscape({
      headless: true,
      elements: {
        nodes: pageElements.map((pageElement) => {
          const data: PageElementNode = {
            id: pageElement.id,
            nodeType: NodeType.PageElement,
            label: pageElement.name,
            props: pageElement.props,
            component: pageElement.component,
          }

          return { data }
        }),
        edges: pageLinks.map((pageLink) => ({
          data: {
            id: pageLink.id,
            source: pageLink.source_page_element_id,
            target: pageLink.target_page_element_id,
            sourceComponentElementId: pageLink.source_component_element_id,
            props: pageLink.props,
            order: pageLink.order,
          },
        })),
      },
    })

    const rootNodeData: PageRootNode = {
      nodeType: NodeType.PageRoot,
      label: pageName,
      id: pageId,
    }

    return CytoscapeService.toSingleRoot(pageElementsGraph, rootNodeData)
  }

  /** Processes a Component to form a tree of component elements with a single page root node at the top */
  static fromComponent({
    id: componentId,
    label: componentLabel,
    elements: componentElements,
    links: componentLinks,
  }: PageElement__ComponentFragment): Core {
    const componentElementsGraph = cytoscape({
      headless: true,
      elements: {
        nodes: componentElements.map((componentElement) => {
          const data: ComponentElementNode = {
            id: componentElement.id,
            nodeType: NodeType.ComponentElement,
            atom: componentElement.atom as AtomFragment,
            label: componentElement.label,
            props: {
              //Normalize the props fragments into a react-readable key value map
              ...componentElement.props?.props?.reduce((props, newProp) => {
                return { ...props, ...propDataEntityToModel(newProp) }
              }, {}),
            },
          }

          return { data }
        }),
        edges: componentLinks.map((componentLink) => ({
          data: {
            id: `cl_${componentLink.source_element_id}_${componentLink.target_element_id}`,
            source: componentLink.source_element_id,
            target: componentLink.target_element_id,
            order: componentLink.order,
            props: componentLink.props,
          },
        })),
      },
    })

    const rootNodeData: ComponentRootNode = {
      nodeType: NodeType.ComponentRoot,
      label: componentLabel,
      id: componentId,
    }

    return CytoscapeService.toSingleRoot(componentElementsGraph, rootNodeData)
  }

  static componentTree(cy: Core): CytoscapeNode {
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
        v._edge = e

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

    return (tree as unknown) as CytoscapeNode
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
