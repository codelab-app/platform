import {
  ComponentFragment,
  ElementEdge,
  ElementFragment,
  ElementGraphFragment,
} from '@codelab/shared/codegen/graphql'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { SingularElementArgument } from 'cytoscape'
import { ElementTree } from './ElementTree'

//
// Hook:
//
const edgeId = (sourceId: string, targetId: string) =>
  `${sourceId}--${targetId}`

const getNodeData = (node: SingularElementArgument) =>
  (node?.data()?.data as ElementFragment | ComponentFragment) ?? null

const isElement = (node: SingularElementArgument) =>
  getNodeData(node)?.__typename === 'Element'

const isComponent = (node: SingularElementArgument) =>
  getNodeData(node)?.__typename === 'Component'

const getEdgeDataFromEdge = (edge: SingularElementArgument) =>
  (edge?.data()?.data as ElementEdge) ?? null

const getEdgeOrder = (edge: SingularElementArgument) =>
  getEdgeDataFromEdge(edge)?.order ?? 0

export class ElementGraphTreeAdapter implements ElementTree {
  private readonly cy: cytoscape.Core

  constructor(graph?: ElementGraphFragment) {
    const { edges, vertices } = graph || { edges: [], vertices: [] }

    this.cy = cytoscape({
      headless: true,
      elements: {
        nodes: vertices.map((v) => ({
          data: { id: v.id, data: v },
        })),
        edges: edges.map((v) => ({
          data: {
            source: v.source,
            target: v.target,
            data: v,
            id: edgeId(v.source, v.target),
          },
        })),
      },
    })
  }

  getComponentOfElement(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .filter(isComponent)
      .first()
      .map(getNodeData)[0] as ComponentFragment
  }

  getPathFromRoot(elementId: string) {
    const path = this.cy.elements().aStar({
      root: `#${this.cy.elements().roots().first().id()}`,
      directed: true,
      goal: `#${elementId}`,
    })

    return {
      found: path.found,
      path: path.path.map((e) => e.id()),
    }
  }

  getAntdTree() {
    const root = this.cy.elements().roots().first()
    let tree: DataNode | null = null
    const nodes: Record<string, DataNode> = {}
    const nodeOrder: Record<string, number> = {}

    this.cy.elements().breadthFirstSearch({
      root,
      visit: (visitedNode, edge) => {
        const element = getNodeData(visitedNode)
        const order = getEdgeOrder(edge)

        const node = {
          ...element,
          // draggable: data.type !== AtomType.ReactRglItem,
          // disabled: data.type === VertexType.React_RGL_Item,
          key: element.id,
          title: element.name,
        }

        nodes[element.id] = node
        nodeOrder[element.id] = order

        if (element.__typename !== 'Element') {
          return
        }

        if (tree === null) {
          tree = node
        }

        if (edge) {
          const parent = edge.source()
          const parentNode = nodes[parent.id()]
          const existingChildren = parentNode.children

          parentNode.children = Array.isArray(existingChildren)
            ? [...existingChildren, node].sort(
                (a, b) => nodeOrder[a.key] - nodeOrder[b.key],
              )
            : [node]
        }
      },
    })

    return tree as unknown as DataNode
  }

  getElementById(id: string) {
    return this.cy
      .elements()
      .filter(isElement)
      .getElementById(id)
      .first()
      .map(getNodeData)[0] as ElementFragment
  }

  getParent(id: string) {
    return this.cy
      .getElementById(id)
      .incomers()
      .nodes()
      .filter(isElement)
      .first()
      .map(getNodeData)[0] as ElementFragment
  }

  getOrderInParent(id: string) {
    return this.cy
      .getElementById(id)
      .incomers()
      .edges()
      .first()
      .map(getEdgeOrder)[0]
  }

  getAllElements() {
    return this.cy
      .elements()
      .filter(isElement)
      .map(getNodeData) as Array<ElementFragment>
  }

  getRoot() {
    return this.cy
      .elements()
      .roots()
      .filter(isElement)
      .first()
      .map(getNodeData)[0] as ElementFragment
  }

  getChildren(elementId: string) {
    // element.children() doesn't work (because we don't set the parent property I think)
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .edges()
      .sort((a, b) => getEdgeOrder(a) - getEdgeOrder(b))
      .targets()
      .filter(isElement)
      .map(getNodeData) as Array<ElementFragment>
  }

  getComponentRootElement(componentId: string): ElementFragment | null {
    return this.cy
      .getElementById(componentId)
      .outgoers()
      .nodes()
      .filter(isElement)
      .first()
      .map(getNodeData)[0] as ElementFragment
  }
}
