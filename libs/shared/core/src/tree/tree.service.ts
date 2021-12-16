import { IEdge, IGraph, IVertex } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import cytoscape, {
  EdgeSingular,
  NodeSingular,
  SearchVisitFunction,
} from 'cytoscape'
import { getEdgeOrder } from '../cytoscape/edge'
import { getCyElementData } from '../cytoscape/element'
import { edgeId } from '../graph/edgeId'
import { filterPredicate, InstancePredicate, Predicate } from './treePredicate'

/**
 * Builds up a Tree from a flattened and normalized representation ({@link IGraph})
 * and provides node-traversal methods for it
 */
export class TreeService<TVertex extends IVertex, TEdge extends IEdge> {
  public readonly cy: cytoscape.Core

  root?: TVertex

  /**
   * This is the default predicate used for searching, override if needed
   */
  predicate: Predicate<TVertex> = () => true

  constructor(
    { vertices, edges }: IGraph<TVertex, TEdge> = { vertices: [], edges: [] },
    extractEdgeId?: (edge: TEdge) => string,
  ) {
    const parentsMap = new Map<string, string>()

    edges.forEach((edge) => {
      parentsMap.set(edge.target, edge.source)
    })

    this.cy = cytoscape({
      headless: true,
      elements: {
        nodes: vertices.map((v) => {
          if (!v.id) {
            throw new Error('Vertex must have an id')
          }

          return {
            // Parent is needed for .children() to work (and some other cy methods too)
            data: { ...v, id: v.id, data: v, parent: parentsMap.get(v.id) },
          }
        }),
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

    this.root = this.cy.elements().roots().map(this.getCyVertexData)[0]
  }

  public getCyVertexData = (cyElement: NodeSingular) =>
    getCyElementData<TVertex>(cyElement)

  public getCyEdgeData = (cyElement: EdgeSingular) =>
    getCyElementData<TEdge>(cyElement)

  getPathFromRoot(vertexId: string, predicate?: Predicate<TVertex>) {
    const root = this.getRootVertex(predicate)
    const target = this.getVertex(vertexId)

    if (!root || !target) {
      return {
        found: false,
        path: undefined,
      }
    }

    const path = this.cy.elements()?.aStar({
      root: `#${root.id}`,
      directed: true,
      goal: `#${vertexId}`,
    })

    return {
      found: path?.found ?? false,
      path: path?.path?.map((e) => e.id()),
    }
  }

  /**
   * Override to customize antd tree node mapping behavior
   */
  protected antdNodeMapper(element: TVertex): DataNode {
    if (!element.id) {
      throw new Error('Element must have an id')
    }

    return {
      ...element,
      key: element.id,
      title: element.name,
    }
  }

  /**
   * Wrapper around bfs visit function
   */
  bfsVisit(visit: SearchVisitFunction, rootId?: string) {
    const root = rootId
      ? this.cy.getElementById(rootId)
      : this.cy.elements().roots().filter(filterPredicate(this.predicate))[0]

    if (!root) {
      throw new Error('No root element or component found')
    }

    return this.cy.elements().bfs({ root, visit })
  }

  getAntdTree(rootPredicate?: Predicate<TVertex>): Nullable<DataNode> {
    const root = this.cy
      .elements()
      .roots()
      .filter(filterPredicate(rootPredicate ?? this.predicate))

    let tree: Nullable<DataNode> = null
    const nodes: Record<string, DataNode> = {}
    const nodeOrder: Record<string, number> = {}

    if (!root) {
      return null
    }

    this.cy.elements().breadthFirstSearch({
      root,
      visit: (visitedNode, edge) => {
        const element = this.getCyVertexData(visitedNode)

        if (!element) {
          return
        }

        const order = getEdgeOrder(edge)
        const node = this.antdNodeMapper(element)

        if (!element.id) {
          throw new Error('Element must have an id')
        }

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
      .nodes()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyVertexData)
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
  ): Maybe<TExpected> {
    return this.cy
      .getElementById(vertexId)
      .filter(filterPredicate(this.predicate ?? predicate ?? (() => true)))
      .first()
      .map<Maybe<TExpected>>(getCyElementData)[0]
  }

  getParentOf(
    elementId: string,
    predicate?: Predicate<TVertex>,
  ): Maybe<TVertex> {
    return this.cy
      .getElementById(elementId)
      .incomers()
      .nodes()
      .filter(filterPredicate(predicate ?? this.predicate))
      .nodes()
      .first()
      .map(this.getCyVertexData)[0]
  }

  getRootVertex(predicate?: Predicate<TVertex>): Maybe<TVertex> {
    return this.cy
      .elements()
      .roots()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyVertexData)[0]
  }

  getRootVertices(predicate?: Predicate<TVertex>): Array<TVertex> {
    return this.cy
      .elements()
      .roots()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyVertexData)
      .filter((v): v is TVertex => !!v)
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
      .map(this.getCyVertexData)
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
      .nodes()
      .first()
      .map(this.getCyVertexData)[0]
  }

  getDescendants(vertexId: string, predicate?: Predicate<TVertex>) {
    return this.cy
      .getElementById(vertexId)
      .descendants()
      .filter(filterPredicate(predicate ?? this.predicate))
      .map(this.getCyVertexData)
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

  /** Collects all descendants of the given vertex into a separate graph */
  getSubgraph(vertexId: string): IGraph<TVertex, TEdge> {
    const vertex = this.cy.getElementById(vertexId)
    const rootData = this.getCyVertexData(vertex)

    if (!rootData) {
      throw new Error('Root vertex not found')
    }

    const subgraph: IGraph<TVertex, TEdge> = { vertices: [rootData], edges: [] }

    vertex.descendants().forEach((node) => {
      const element = this.getCyVertexData(node)

      if (!element) {
        return
      }

      subgraph.vertices.push(element)
    })

    vertex.edges().forEach((edge) => {
      const source = this.getCyVertexData(edge.source())
      const target = this.getCyVertexData(edge.target())
      const edgeData = this.getCyEdgeData(edge)

      if (!source || !target || !edgeData) {
        return
      }

      subgraph.edges.push(edgeData)
    })

    return subgraph
  }
}

export interface TreeDiff<TVertex, TEdge> {
  edges: {
    added: Array<TEdge>
    updated: Array<TEdge>
    unchanged: Array<TEdge>
    removed: Array<TEdge>
  }
  vertices: {
    added: Array<TVertex>
    updated: Array<TVertex>
    unchanged: Array<TVertex>
    removed: Array<TVertex>
  }
}
