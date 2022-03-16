import { IEdge, IGraph, IVertex } from '@codelab/shared/abstract/core'
import { Maybe, MaybePromise } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import cytoscape, {
  EdgeSingular,
  NodeSingular,
  SearchVisitFunction,
} from 'cytoscape'
import { getEdgeOrder } from '../cytoscape/edge'
import { getCyElementData } from '../cytoscape/element'
import { edgeId } from '../graph/edgeId'
import { reduceToNested } from './reduce-to-nested/reduce-to-nested'
import { filterPredicate, InstancePredicate, Predicate } from './treePredicate'
import { BfsReduceInput } from './types'

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
    return {
      ...element,
      key: element.id,
      title: element.name,
    }
  }

  /**
   * Override to customize antd tree adding child behavior
   */
  protected antdChildToNode(parent: DataNode, child: DataNode): void {
    const existingChildren = parent.children

    parent.children = Array.isArray(existingChildren)
      ? [...existingChildren, child]
      : [child]
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

  dfs(visit: SearchVisitFunction, rootId?: string) {
    const root = rootId
      ? this.cy.getElementById(rootId)
      : this.cy.elements().roots().filter(filterPredicate(this.predicate))[0]

    if (!root) {
      throw new Error('No root element or component found')
    }

    return this.cy.elements().dfs({ root, visit })
  }

  findFirstDeepestNode() {
    const { found: deepestNode } = this.dfs((node) => {
      if (node.children().empty()) {
        return true
      }
    })

    return deepestNode
  }

  /**
   * Wrapper around bfs visit function that parses the node data and adds ability to execute promises
   *
   * @param visit the visit function
   * @param rootId the root node from which to start the search
   * @param sequential if true, the promises will be awaited sequentially. If false - they will be awaited in parallel
   */
  async bfsDataVisitAsync(
    visit: (
      vertex: TVertex,
      edge: TEdge | undefined,
      parent: TVertex | undefined,
      i: number,
      depth: number,
    ) => MaybePromise<void>,
    rootId?: string,
    sequential?: boolean,
  ) {
    const promises: Array<MaybePromise<boolean | void>> = []

    const visitWrapped: SearchVisitFunction = (v, e, u, i, d) => {
      const vertex = this.getCyVertexData(v)

      if (!vertex) {
        throw new Error('Vertex not found')
      }

      const edge = e ? this.getCyEdgeData(e) : undefined
      const parent = u ? this.getCyVertexData(u) : undefined
      const promise = visit(vertex, edge, parent, i, d)

      promises.push(promise)
    }

    this.bfsVisit(visitWrapped, rootId)

    if (sequential) {
      for (const promise of promises) {
        await promise
      }
    } else {
      await Promise.all(promises)
    }
  }

  /**
   * Transforms the {@link IGraph} into a nested tree structure of the type {children: [{children: [...]}]}
   * The nodeMapper and addChildToNode are called with every possible combination of parent-child exactly once
   */
  reduceToNested<TOut>(input: BfsReduceInput<TVertex, TEdge, TOut>) {
    return reduceToNested<TVertex, TEdge, TOut>(this.cy)(input)
  }

  getAntdTree(): Array<DataNode> {
    const nodeMapper = (node: TVertex) => this.antdNodeMapper(node)

    const addChildToNode = (parent: DataNode, child: DataNode) =>
      this.antdChildToNode(parent, child)

    const root = this.reduceToNested({
      nodeMapper,
      addChildToNode,
    })

    return root ?? []
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
