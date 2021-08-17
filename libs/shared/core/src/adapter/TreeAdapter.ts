import { Edge, Graph, Vertex } from '@codelab/shared/abstract/core'
import { edgeId, getEdgeOrder, getElementData } from '@codelab/shared/core'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { SingularElementArgument } from 'cytoscape'

type ElementPredicate<TElement = SingularElementArgument> = (
  element: TElement,
) => boolean

/**
 * The TreeAdapter implements the Graph port interface. Think of the GraphQL server data as the contract, and we're adapting to that.
 */
export abstract class TreeAdapter<TVertex extends Vertex, TEdge extends Edge>
  implements Graph<TVertex, Edge>
{
  protected readonly cy: cytoscape.Core

  edges: ReadonlyArray<TEdge>

  vertices: ReadonlyArray<TVertex>

  root: TVertex

  /**
   * This is the default predicate used for searching, can be overridden.
   */
  abstract predicate: ElementPredicate = () => true

  protected constructor(graph?: Graph<TVertex, TEdge> | null) {
    this.vertices = graph?.vertices ?? []
    this.edges = graph?.edges ?? []

    const parentsMap = new Map<string, string>()

    this.edges.forEach((edge) => {
      parentsMap.set(edge.target, edge.source)
    })

    this.cy = cytoscape({
      headless: true,
      elements: {
        nodes: this.vertices.map((v) => ({
          data: { id: v.id, data: v, parent: parentsMap.get(v.id) },
        })),
        edges: this.edges.map((v) => ({
          data: {
            source: v.source,
            target: v.target,
            data: v,
            id: edgeId(v),
          },
        })),
      },
    })

    this.root = this.cy.elements().roots().map<TVertex>(getElementData)[0]
  }

  /**
   * Get all elements in cytoscape according to the predicate
   *
   * @param predicate filters the type of element
   */
  private getAllElements<TElement = TVertex>(predicate: ElementPredicate) {
    return this.cy.elements().filter(predicate).map<TElement>(getElementData)
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

  /**
   * @param predicate
   */
  getAntdTree() {
    const root = this.cy.elements().roots().first()
    let tree: DataNode | null = null
    const nodes: Record<string, DataNode> = {}
    const nodeOrder: Record<string, number> = {}

    this.cy.elements().breadthFirstSearch({
      root,
      visit: (visitedNode, edge) => {
        const element = getElementData(visitedNode)
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

  getAllNodes<TElement = TVertex>(predicate: ElementPredicate = () => true) {
    return this.cy
      .elements()
      .filter(this.predicate ?? predicate)
      .map<TElement>(getElementData)
  }

  /**
   * Get the element by id
   *
   * @param elementId element id
   * @param predicate optional predicate
   */
  getElement<TElement = TVertex>(
    elementId: string,
    predicate: ElementPredicate = () => true,
  ) {
    return this.cy
      .getElementById(elementId)
      .filter(predicate)
      .first()
      .map<TElement>(getElementData)[0]
  }

  getParent<TElement = TVertex>(
    elementId: string,
    predicate: ElementPredicate = () => true,
  ) {
    return this.cy
      .getElementById(elementId)
      .incomers()
      .nodes()
      .filter(this.predicate ?? predicate)
      .first()
      .map<TElement>(getElementData)[0]
  }

  getRoot<TElement = TVertex>() {
    return this.cy.elements().roots().map<TElement>(getElementData)[0]
  }

  getChildren<TElement = TVertex>(
    elementId: string,
    predicate: ElementPredicate = () => true,
  ) {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .edges()
      .sort((a, b) => getEdgeOrder(a) - getEdgeOrder(b))
      .targets()
      .filter(this.predicate ?? predicate)
      .map<TElement>(getElementData)
  }

  findElementFrom<TElement = TVertex>(
    elementId: string,
    predicate: ElementPredicate,
  ): TElement | undefined {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .nodes()
      .filter(predicate)
      .first()
      .map<TElement>(getElementData)[0]
  }

  // getParent(elementId: string) {
  //   return this.cy
  //     .getElementById(elementId)
  //     .incomers()
  //     .nodes()
  //     .filter(isElement)
  //     .first()
  //     .map<ElementFragment>(getElementData)[0]
  // }

  getNodeById<TElement = TVertex>(
    id: string,
    predicate: ElementPredicate = () => true,
  ) {
    return this.cy
      .elements()
      .filter(predicate)
      .getElementById(id)
      .first()
      .map<TElement>(getElementData)[0]
  }

  getDescendants<TElement = TVertex>(
    elementId: string,
    predicate: ElementPredicate = () => true,
  ) {
    return this.cy
      .getElementById(elementId)
      .descendants()
      .filter(this.predicate ?? predicate)
      .map<TElement>(getElementData)
  }

  getOrderInParent(elementId: string) {
    return this.cy
      .getElementById(elementId)
      .incomers()
      .edges()
      .first()
      .map(getEdgeOrder)[0]
  }
}
