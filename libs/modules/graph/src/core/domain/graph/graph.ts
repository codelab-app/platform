import arrayMove from 'array-move'
import { Type, classToPlain, plainToClass } from 'class-transformer'
import { EdgeDto } from '../../../presentation/EdgeDto'
import { GraphDto } from '../../../presentation/GraphDto'
import { VertexDto } from '../../../presentation/VertexDto'
import { Edge } from '../edge'
import { Vertex } from '../vertex'
import { GraphEdges } from './graph-edges'
import { GraphLabel } from './graph-label'
import { GraphVertices } from './graph-vertices'
import {
  AggregateRoot,
  NOID,
  TransformBoth,
  TypeOrmGraph,
  UUID,
} from '@codelab/backend'

type VertexId = string

export class Graph<ID extends UUID | NOID = UUID> extends AggregateRoot<
  GraphDto,
  ID
> {
  @Type(() => GraphLabel)
  @TransformBoth(GraphLabel)
  declare label: GraphLabel

  @Type(() => GraphVertices)
  @TransformBoth(GraphVertices)
  declare vertices: GraphVertices

  @Type(() => GraphEdges)
  @TransformBoth(GraphEdges)
  declare edges: GraphEdges

  public getEdgesDomain(): Array<Edge> {
    const edgesPlain: Array<EdgeDto> = this.edges.value
    const edges: Array<Edge> = plainToClass(Edge, edgesPlain)

    return edges
  }

  public addVertex(v: Vertex) {
    const vertex = classToPlain(v) as VertexDto
    let newVertices

    if (!this.hasVertex(vertex?.id)) {
      if (this.vertices) {
        const vertices: Array<VertexDto> = this.vertices.value

        vertices.push(vertex)
        newVertices = new GraphVertices({ value: vertices })
      } else {
        newVertices = new GraphVertices({ value: [vertex] })
      }

      this.vertices = newVertices
    }
  }

  private hasVertex(vertexId: string | undefined): boolean {
    if (this.vertices) {
      const vertices: Array<VertexDto> = this.vertices.value

      const index = vertices.findIndex((v: VertexDto) => {
        return v.id === vertexId
      })

      return index !== -1
    }

    return false
  }

  public moveVertex(source: string, target: string) {
    const vertices: Array<VertexDto> = this.vertices.value

    const vertexSource = vertices?.find((v: VertexDto) => v.id === source)
    const vertexTarget = vertices?.find((v: VertexDto) => v.id === target)

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

  private moveWithSameParent(source: VertexId, target: VertexId) {
    let targetEdgeIndex = this.getEdgeIndexByTarget(target)
    const sourceEdgeIndex = this.getEdgeIndexByTarget(source)

    // Move to the left
    if (targetEdgeIndex < sourceEdgeIndex) {
      targetEdgeIndex += 1
    }

    this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex)
  }

  private moveWithDifferentParent(
    vertexSource: VertexDto,
    vertexTarget: VertexDto,
    source: VertexId,
    target: VertexId,
  ) {
    const edges: Array<EdgeDto> = this.edges.value
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
    let edges: Array<EdgeDto> = this.edges.value

    edges = arrayMove(edges, sourceIndex, targetIndex)
    edges = edges.map((e: EdgeDto, index: number) => {
      e.order = index

      return e
    })
    const newGraphEdges = new GraphEdges({ value: edges })

    this.edges = newGraphEdges
  }

  private getEdgeIndexBySourceAndTarget(
    source: VertexId | undefined,
    target: VertexId,
  ): number {
    if (source) {
      const edges: Array<EdgeDto> = this.edges.value

      return edges.findIndex((e: EdgeDto) => {
        return e.source === source && e.target === target
      })
    }

    return -1
  }

  private getEdgeIndexByTarget(target: VertexId) {
    const edges: Array<EdgeDto> = this.edges.value

    return edges.findIndex((e: EdgeDto) => {
      return e.target === target
    })
  }

  toPersistence(): TypeOrmGraph {
    return plainToClass(TypeOrmGraph, this.toPlain())
  }
}
