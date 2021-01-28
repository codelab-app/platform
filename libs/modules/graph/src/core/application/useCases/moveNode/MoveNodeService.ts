import { Injectable } from '@nestjs/common'
import { Graph as PrismaGraph } from '@prisma/client'
import arrayMove from 'array-move'
import { Edge } from '../../../domain/edge/Edge'
import { Graph } from '../../../domain/graph/Graph'
import { Vertex } from '../../../domain/vertex/Vertex'
import { MoveNodeInput } from './MoveNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export type VertexId = string

@Injectable()
export class MoveNodeService
  implements TransactionalUseCase<MoveNodeInput, Graph> {
  declare graph: Graph

  constructor(private readonly prismaService: PrismaService) {}

  async execute(input: MoveNodeInput): Promise<Graph> {
    const { graphId } = input

    try {
      this.graph = ((await this.prismaService.graph.findUnique({
        where: {
          id: graphId,
        },
        select: {
          id: true,
          label: true,
          vertices: {
            select: {
              id: true,
              type: true,
              props: true,
            },
          },
          edges: {
            select: {
              id: true,
              source: true,
              target: true,
              props: true,
              order: true,
            },
          },
        },
        rejectOnNotFound: true,
      })) as unknown) as Graph
    } catch (e) {
      throw new Error(`Graph with graphId ${graphId} was not found`)
    }

    if (
      !this.graph.vertices ||
      !this.graph.edges ||
      this.graph.vertices.length === 0 ||
      this.graph.edges.length === 0
    ) {
      throw new Error('Vertices or edges are not found for this graph')
    }

    this.setVertexParent()
    this.moveVertex(input.type.source, input.type.target)
    const { edges } = this.graph

    delete this.graph.edges
    delete this.graph.vertices

    const updateEdges = edges.map((e: Edge) => {
      return {
        data: {
          source: e.source,
          target: e.target,
          props: e.props,
          order: e.order,
        },
        where: {
          id: e.id,
        },
      }
    })
    const updatedGraph = await this.prismaService.graph.update({
      where: {
        id: graphId,
      },
      data: {
        ...(this.graph as PrismaGraph),
        edges: {
          updateMany: [...updateEdges],
        },
      },
    })

    return updatedGraph
  }

  setVertexParent() {
    this.graph.edges?.forEach((edge: Edge) => {
      const v: Vertex | undefined = this.graph.vertices?.find(
        (vertex: Vertex) => {
          return vertex.id === edge.target
        },
      )

      if (v) {
        v.parent = edge.source
      }
    })
    this.sortEdges()
  }

  private sortEdges() {
    this.graph.edges?.sort((a, b) => {
      return a.order - b.order
    })
  }

  private moveVertex(source: VertexId, target: VertexId) {
    /*
     * This cannot be retrieved from db as this object is part of the graph
     * The parent property of all the vertices are set after we load the graph from db
     * vertexSource and VertexTarget is passed into a function that is responsible for
     * moving with different parent and we need the parent property of the vertex set
     */
    const vertexSource = this.graph.vertices?.find(
      (v: Vertex) => v.id === source,
    )
    const vertexTarget = this.graph.vertices?.find(
      (v: Vertex) => v.id === target,
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
    vertexSource: Vertex,
    vertexTarget: Vertex,
    source: VertexId,
    target: VertexId,
  ) {
    const sourceEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexSource.parent,
      source,
    )
    let targetEdgeIndex = this.getEdgeIndexBySourceAndTarget(
      vertexTarget.parent,
      target,
    )

    if (sourceEdgeIndex !== -1 && targetEdgeIndex !== -1) {
      const sourceEdge = this.graph.edges![sourceEdgeIndex]
      const targetEdge = this.graph.edges![targetEdgeIndex]

      sourceEdge.source = targetEdge.source

      // Move to the left
      if (targetEdgeIndex < sourceEdgeIndex) {
        targetEdgeIndex += 1
      }

      this.moveEdgeAndUpdateOrder(sourceEdgeIndex, targetEdgeIndex)
    }
  }

  private moveEdgeAndUpdateOrder(sourceIndex: number, targetIndex: number) {
    let edges: Array<Edge> = this.graph.edges!

    edges = arrayMove(edges, sourceIndex, targetIndex)
    edges = edges.map((e: Edge, index: number) => {
      e.order = index

      return e
    })
    this.graph.edges = edges
  }

  private getEdgeIndexBySourceAndTarget(
    source: VertexId | undefined,
    target: VertexId,
  ): number {
    if (source) {
      return this.graph.edges!.findIndex((e: Edge) => {
        return e.source === source && e.target === target
      })
    }

    return -1
  }

  private getEdgeIndexByTarget(target: VertexId) {
    return this.graph.edges!.findIndex((e: Edge) => {
      return e.target === target
    })
  }
}
