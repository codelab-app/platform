import { Edge, Graph, Vertex } from '@codelab/shared/abstract/core'
import { DataNode } from 'antd/lib/tree'
import cytoscape, { SingularElementArgument } from 'cytoscape'
import { getEdgeOrder } from '../cytoscape/edge'
import { getCyElementData } from '../cytoscape/element'
import { edgeId } from '../graph/edgeId'
import { filterPredicate, InstancePredicate, Predicate } from './treePredicate'

/**
 * The TreeAdapter implements the Graph port interface. Think of the GraphQL server data as the contract, and we're adapting to that.
 */
export class TreeAdapter<TVertex extends Vertex, TEdge extends Edge> {
  protected readonly cy: cytoscape.Core

  root: TVertex

  /**
   * This is the default predicate used for searching, override if needed
   */
  predicate: Predicate<TVertex> = () => true

  constructor(
    graph?: Graph<TVertex, TEdge> | null,
    extractEdgeId?: (edge: TEdge) => string,
  ) {
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
          // Parent is needed for .children() to work (and some other cy methods too)
          data: { ...v, id: v.id, data: v, parent: parentsMap.get(v.id) },
        })),
        edges: edges.map((e) => ({
          data: {
            ...e,
            data: e,
            source: e.source,
            target: e.target,
            id: extractEdgeId ? extractEdgeId(e) : edgeId(e),
          },
        })),
      },
    })

    const root = this.cy.elements().roots().map(this.getCyElementData)[0]

    if (!root) {
      throw new Error("Can't construct tree, root vertex not found")
    }

    this.root = root
  }

  /** Extracts our custom data from a cytoscape element (node/edge) */
  protected getCyElementData = (cyElement: SingularElementArgument) =>
    getCyElementData<TVertex>(cyElement)

  getPathFromRoot(vertexId: string) {
    const path = this.cy.elements().aStar({
      root: `#${this.cy.elements().roots().first().id()}`,
      directed: true,
      goal: `#${vertexId}`,
    })

    return {
      found: path.found,
      path: path.path.map((e) => e.id()),
    }
  }

  /**
   * Override to customize antd tree node mapping behavior
   */
  protected antdNodeMapper(element: TVertex): DataNode {
    return {
      ...element,
      key: element.id,
      title: element.name,
    }
  }

  getAntdTree(): DataNode {
    const root = this.cy.elements().roots().first()
    let tree: DataNode | null = null
    const nodes: Record<string, DataNode> = {}
    const nodeOrder: Record<string, number> = {}

    this.cy.elements().breadthFirstSearch({
      root,
      visit: (visitedNode, edge) => {
        const element = this.getCyElementData(visitedNode)

        if (!element) {
          return
        }

        const order = getEdgeOrder(edge)
        const node = this.antdNodeMapper(element)

        nodes[element.id] = node
        nodeOrder[element.id] = order

        if (!this.predicate(element)) {
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

  getAllVertices(predicate?: Predicate<TVertex>): Array<TVertex> {
    return this.cy
      .elements()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyElementData)
      .filter((v): v is TVertex => !!v)
  }

  /**
   * Returns a vertex by id or undefined if not found
   *
   * @param vertexId element id
   * @param predicate optional predicate
   */
  getVertex<TExpected extends TVertex>(
    vertexId: string,
    predicate?: InstancePredicate<TVertex, TExpected>,
  ): TExpected | undefined {
    return this.cy
      .getElementById(vertexId)
      .filter(filterPredicate(this.predicate ?? predicate ?? (() => true)))
      .first()
      .map<TExpected | undefined>(getCyElementData)[0]
  }

  getParentOf(
    elementId: string,
    predicate?: Predicate<TVertex>,
  ): TVertex | undefined {
    return this.cy
      .getElementById(elementId)
      .incomers()
      .nodes()
      .filter(filterPredicate(predicate ?? this.predicate))
      .first()
      .map(this.getCyElementData)[0]
  }

  getRootVertex() {
    return this.cy.elements().roots().map(this.getCyElementData)[0]
  }

  getChildren(
    elementId: string,
    predicate?: Predicate<TVertex>,
  ): Array<TVertex> {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .edges()
      .sort((a, b) => getEdgeOrder(a) - getEdgeOrder(b))
      .targets()
      .filter(filterPredicate(this.predicate ?? predicate))
      .map(this.getCyElementData)
      .filter((v): v is TVertex => !!v)
  }

  findChildVertex(
    elementId: string,
    predicate?: Predicate<TVertex>,
  ): TVertex | undefined {
    return this.cy
      .getElementById(elementId)
      .outgoers()
      .nodes()
      .filter(filterPredicate(predicate ?? this.predicate))
      .first()
      .map(this.getCyElementData)[0]
  }

  getDescendants(vertexId: string, predicate?: Predicate<TVertex>) {
    return this.cy
      .getElementById(vertexId)
      .descendants()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyElementData)
      .filter((e): e is TVertex => !!e)
  }

  getOrderInParent(vertexId: string) {
    return this.cy
      .getElementById(vertexId)
      .incomers()
      .edges()
      .first()
      .map(getEdgeOrder)[0]
  }
}
