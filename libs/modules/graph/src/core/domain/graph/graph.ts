import arrayMove from 'array-move'
import { Type, classToPlain, plainToClass } from 'class-transformer'
import { VertexID } from '../../../../../../../apps/api/graph/src/models/graph/graph.entity'
import { CreateGraphRequest } from '../../application/useCases/createGraph/CreateGraphRequest'
import { Edge } from '../edge'
import { SerializedEdgeDto } from '../edge/dto/SerializedEdgeDto'
import { SerializedVertexDto } from '../vertex/dto/SerializedVertexDto'
import { SerializedGraphDto } from './dto/SerializedGraphDto'
import { GraphEdges } from './graph-edges'
import { GraphLabel } from './graph-label'
import { GraphVertices } from './graph-vertices'
import { AggregateRoot, TransformBoth, TypeOrmGraph } from '@codelab/backend'

export class Graph extends AggregateRoot<SerializedGraphDto> {
  @Type(() => GraphLabel)
  @TransformBoth(GraphLabel)
  declare label?: GraphLabel

  @Type(() => GraphVertices)
  @TransformBoth(GraphVertices)
  declare vertices: GraphVertices

  @Type(() => GraphEdges)
  @TransformBoth(GraphEdges)
  declare edges: GraphEdges

  public getEdgesDomain(): Array<Edge> {
    const edgesPlain: Array<SerializedEdgeDto> = this.edges.value
    const edges: Array<Edge> = plainToClass(Edge, edgesPlain)

    return edges
  }

  public moveVertex(source: string, target: string) {
    const vertices: Array<SerializedVertexDto> = this.vertices.value

    const vertexSource = vertices?.find(
      (v: SerializedVertexDto) => v.id === source,
    )
    const vertexTarget = vertices?.find(
      (v: SerializedVertexDto) => v.id === target,
    )

    if (!vertexSource) {
      throw new Error(`Vertex source with id: ${source} was not found`)
    }

    if (!vertexTarget) {
      throw new Error(`Vertex target with id: ${target} was not found`)
    }

    // Check for same parent
    if (vertexSource.parent === vertexTarget.parent) {
      this.moveWithSameParent(source, target)
    } else {
      this.moveWithDifferentParent(vertexSource, vertexTarget, source, target)
    }
  }

  private moveWithSameParent(source: VertexID, target: VertexID) {
    let targetEdgeIndex = this.getEdgeIndexByTarget(target)
    const sourceEdgeIndex = this.getEdgeIndexByTarget(source)

    // Move to the left
    if (targetEdgeIndex < sourceEdgeIndex) {
      targetEdgeIndex += 1
    }

    this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex)
  }

  private moveWithDifferentParent(
    vertexSource: SerializedVertexDto,
    vertexTarget: SerializedVertexDto,
    source: VertexID,
    target: VertexID,
  ) {
    const edges: Array<SerializedEdgeDto> = this.edges.value
    const sourceEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexSource.parent,
      source,
    )
    let targetEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexTarget.parent,
      target,
    )

    if (sourceEdgeIndex !== -1 && targetEdgeIndex !== -1) {
      const sourceEdge = edges[sourceEdgeIndex]
      const targetEdge = edges[targetEdgeIndex]

      sourceEdge.source = targetEdge.source

      // Move to the left
      if (targetEdgeIndex < sourceEdgeIndex) {
        targetEdgeIndex += 1
      }

      this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex)
    }
  }

  private moveEdgeAndUpdateOrder(sourceIndex: number, targetIndex: number) {
    let edges: Array<SerializedEdgeDto> = this.edges.value

    edges = arrayMove(edges, sourceIndex, targetIndex)
    edges = edges.map((e: SerializedEdgeDto, index: number) => {
      e.order = index

      return e
    })
    const newGraphEdges = new GraphEdges({ value: edges })

    this.edges = newGraphEdges
  }

  private getEdgeIndexBySourceAndTarget(
    source: VertexID | undefined,
    target: VertexID,
  ): number {
    if (source) {
      const edges: Array<SerializedEdgeDto> = this.edges.value

      return edges.findIndex((e: SerializedEdgeDto) => {
        return e.source === source && e.target === target
      })
    }

    return -1
  }

  private getEdgeIndexByTarget(target: VertexID) {
    const edges: Array<SerializedEdgeDto> = this.edges.value

    return edges.findIndex((e: SerializedEdgeDto) => {
      return e.target === target
    })
  }

  /**
   * Used for instantiating a User object
   * @param props
   */
  public static hydrate(props: SerializedGraphDto) {
    const graph = plainToClass(Graph, props)

    return graph
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: CreateGraphRequest): Graph {
    const graph = Graph.hydrate(request)

    return graph
  }

  toPlain() {
    return classToPlain(this) as SerializedGraphDto
  }

  toPersistence(): TypeOrmGraph {
    return plainToClass(TypeOrmGraph, this.toPlain())
  }

  public static arrayToPlain(graphs: Array<Graph>) {
    return classToPlain(graphs) as Array<SerializedGraphDto>
  }
}
