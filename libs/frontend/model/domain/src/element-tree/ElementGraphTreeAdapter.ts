import { Edge, Graph, Vertex } from '@codelab/backend/abstract/types'
import { ElementTree } from '@codelab/frontend/abstract/props'
import {
  ComponentFragment,
  ElementEdge,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { SingularElementArgument } from 'cytoscape'

//
// Hook:
//
const edgeId = (sourceId: string, targetId: string) =>
  `${sourceId}--${targetId}`

// const getNodeData = (node: SingularElementArgument) =>
//   (node?.data()?.data as ElementFragment | ComponentFragment) ?? null

const getNodeData = <TData>(node: SingularElementArgument) =>
  node?.data()?.data as TData

const isElement = (node: SingularElementArgument) =>
  getNodeData<ElementFragment>(node)?.__typename === 'Element'

const isComponent = (node: SingularElementArgument) =>
  getNodeData<ComponentFragment>(node)?.__typename === 'Component'

const getEdgeDataFromEdge = (edge: SingularElementArgument) =>
  (edge?.data()?.data as ElementEdge) ?? null

const getEdgeOrder = (edge: SingularElementArgument) =>
  getEdgeDataFromEdge(edge)?.order ?? 0

export class ElementGraphTreeAdapter implements ElementTree<ElementFragment> {
  private readonly cy: cytoscape.Core

  constructor(graph?: Graph<Vertex, Edge> | null) {
    const vertices = graph?.vertices ?? []
    const edges = graph?.edges ?? []
    const parentsMap = new Map<string, string>()

    edges.forEach((edge) => {
      parentsMap.set(edge.target, edge.source)
    })

    this.cy = cytoscape({
      headless: true,
      elements: {
        nodes: vertices.map((v) => ({
          data: { id: v.id, data: v, parent: parentsMap.get(v.id) },
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
      .map<ComponentFragment>(getNodeData)[0]
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
        const element = getNodeData<ElementFragment>(visitedNode)
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

  getNodeById(id: string) {
    return this.cy
      .elements()
      .filter(isElement)
      .getElementById(id)
      .first()
      .map<ElementFragment>(getNodeData)[0]
  }

  getParent(id: string) {
    return this.cy
      .getElementById(id)
      .incomers()
      .nodes()
      .filter(isElement)
      .first()
      .map<ElementFragment>(getNodeData)[0]
  }

  getOrderInParent(id: string) {
    return this.cy
      .getElementById(id)
      .incomers()
      .edges()
      .first()
      .map(getEdgeOrder)[0]
  }

  getAllNodes() {
    return this.cy
      .elements()
      .filter(isElement)
      .map<ElementFragment>(getNodeData)
  }

  getRoot() {
    return this.cy
      .elements()
      .roots()
      .filter(isElement)
      .first()
      .map<ElementFragment>(getNodeData)[0]
  }

  getChildren(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .edges()
      .sort((a, b) => getEdgeOrder(a) - getEdgeOrder(b))
      .targets()
      .filter(isElement)
      .map<ElementFragment>(getNodeData)
  }

  getComponentRootElement(componentId: string): ElementFragment | undefined {
    return this.cy
      .getElementById(componentId)
      .outgoers()
      .nodes()
      .filter(isElement)
      .first()
      .map<ElementFragment>(getNodeData)[0]
  }

  getComponentById(componentId: string) {
    return this.cy
      .getElementById(componentId)
      .filter(isComponent)
      .first()
      .map(getNodeData)[0] as ComponentFragment
  }

  getDescendants(elementId: string) {
    console.log(
      this.cy.getElementById(elementId).descendants().map(getNodeData),
    )

    return this.cy
      .getElementById(elementId)
      .descendants()
      .filter(isElement)
      .map<ElementFragment>(getNodeData)
  }
}
