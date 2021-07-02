/* eslint-disable no-param-reassign */
import {
  PageElementLinkFragment,
  PageElementRootFragment,
} from '@codelab/codegen/graphql'
import { __ComponentFragment } from '@codelab/codegen/hasura'
import {
  AtomType,
  CytoscapeNode,
  NodeType,
  PageElementNode,
} from '@codelab/frontend/shared'
import { PropsJsonModelAdaptor } from '@codelab/modules/type'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core } from 'cytoscape'

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
  static fromPage(root: PageElementRootFragment): Core {
    const { descendants, links } = root

    const rootNodeData: PageElementNode = {
      id: root.id,
      atom: root.atom,
      name: root.name,
      nodeType: NodeType.PageElement,
      css: root.css,
      props: {},
    }

    return cytoscape({
      headless: true,
      elements: {
        nodes: [
          { data: rootNodeData },
          ...descendants.map((pageElement) => {
            const data: PageElementNode = {
              id: pageElement.id,
              nodeType: NodeType.PageElement,
              name: pageElement.name,
              atom: pageElement.atom,
              css: pageElement.css,
              props: PropsJsonModelAdaptor.propsToModel(
                pageElement.props,
                true,
              ),
            }

            return { data }
          }),
        ],
        edges: links
          .slice()
          .sort((a, b) => a.from.localeCompare(b.from) || a.order - b.order)
          .map((link) => ({
            data: {
              id: CytoscapeService.generateLinkId(link),
              source: link.from,
              target: link.to,
              order: link.order,
            },
          })),
      },
    })
  }

  /** Processes a Component to form a tree of component elements with a single page root node at the top */
  static fromComponent({
    id: componentId,
    label: componentLabel,
    elements: componentElements,
    links: componentLinks,
  }: __ComponentFragment): Core {
    //   const componentElementsGraph = cytoscape({
    //     headless: true,
    //     elements: {
    //       nodes: componentElements.map((componentElement) => {
    //         const data: ComponentElementNode = {
    //           id: componentElement.id,
    //           nodeType: NodeType.ComponentElement,
    //           atom: componentElement.atom,
    //           label: componentElement.label,
    //           props: {
    //             // Normalize the props fragments into a react-readable key value map
    //             ...componentElement.props?.props?.reduce((props, newProp) => {
    //               return { ...props, ...propDataEntityToModel(newProp) }
    //             }, {}),
    //           },
    //         }
    //
    //         return { data }
    //       }),
    //       // nodes: componentElements.map((componentElement) => {
    //       //   return { data: componentElement }
    //       // }),
    //       edges: componentLinks.map((componentLink) => ({
    //         data: {
    //           id: `cl_${componentLink.source_component_element_id}_${componentLink.target_component_element_id}`,
    //           source: componentLink.source_component_element_id,
    //           target: componentLink.target_component_element_id,
    //           order: componentLink.order,
    //           props: componentLink.props,
    //         },
    //       })),
    //     },
    //   })
    //
    //   const rootNodeData: ComponentNode = {
    //     nodeType: NodeType.Component,
    //     label: componentLabel,
    //     id: componentId,
    //   }
    //
    //   return CytoscapeService.toSingleRoot(componentElementsGraph, rootNodeData)
    return null as any
  }

  //
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

    return tree as unknown as CytoscapeNode
  }

  static antdTree(
    cy: Core,
    nodeMapper: (v: any) => any = () => null,
  ): DataNode {
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
          title: data.name,
          ...nodeMapper(data),
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

    return tree as unknown as DataNode
  }

  private static generateLinkId(link: PageElementLinkFragment) {
    return `link-${link.from}-${link.to}`
  }
}
