import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindEdgeBy } from '../../common/CommonTypes'
import { isEdgeId, isEdgeSource, isEdgeTarget } from '../../common/utils'
import { EdgeRepositoryPort } from '../../core/adapters/EdgeRepositoryPort'
import { Edge } from '../../core/domain/edge'
import { Graph } from '../../core/domain/graph'
import { TypeOrmEdge } from '@codelab/backend'

@EntityRepository(TypeOrmEdge)
export class TypeOrmEdgeRepositoryAdapter
  extends Repository<TypeOrmEdge>
  implements EdgeRepositoryPort {
  async exists(searchBy: FindEdgeBy): Promise<boolean> {
    let edge

    if (isEdgeId(searchBy)) {
      edge = await this.findOne(searchBy.id)
    }

    return !!edge
  }

  async createEdge(edge: Edge, graph?: Graph): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()

    if (graph) {
      const typeOrmGraph = graph.toPersistence()

      typeOrmEdge.graph = typeOrmGraph
    }

    const newEdge = await this.save(typeOrmEdge)

    return plainToClass(Edge, newEdge)
  }

  async deleteEdge(edge: Edge): Promise<Option<Edge>> {
    const typeOrmEdge = edge.toPersistence()
    const edges = await this.remove([typeOrmEdge])

    return edges.length > 0
      ? Promise.resolve(O.some(plainToClass(Edge, edges[0])))
      : O.none
  }

  async deleteEdgesByVertexId(vertexId: string): Promise<Array<Edge>> {
    const typeOrmEdgesBySource: Array<TypeOrmEdge> = await this.find({
      where: { source: vertexId },
    })
    const typeOrmEdgesByTarget: Array<TypeOrmEdge> = await this.find({
      where: { target: vertexId },
    })

    const toRemove = [...typeOrmEdgesBySource, ...typeOrmEdgesByTarget]
    const removedEdges: Array<TypeOrmEdge> = await this.remove(toRemove)

    const edges: Array<Edge> = plainToClass(Edge, removedEdges)

    return edges
  }

  async findEdge(by: FindEdgeBy): Promise<Option<Edge>> {
    let typeOrmEdge

    if (isEdgeId(by)) {
      typeOrmEdge = await this.findOne(by.id)
    }

    if (isEdgeSource(by)) {
      typeOrmEdge = await this.findOne({ where: { source: by.source } })
    }

    if (isEdgeTarget(by)) {
      typeOrmEdge = await this.findOne({ where: { target: by.target } })
    }

    return typeOrmEdge
      ? Promise.resolve(O.some(plainToClass(Edge, typeOrmEdge)))
      : O.none
  }

  async updateEdge(edge: Edge): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()
    const existingEdge = await this.findOne(typeOrmEdge.id)
    const updatedEdge = await this.save({
      ...existingEdge,
      ...edge.toPlain(),
    })

    return plainToClass(Edge, updatedEdge)
  }

  async updateEdges(edges: Array<Edge>): Promise<Array<Edge>> {
    const typeOrmEdges: Array<TypeOrmEdge> = edges.map((edge) =>
      edge.toPersistence(),
    )
    const updatedEdges: Array<TypeOrmEdge> = await this.save(typeOrmEdges)

    return updatedEdges.map((edge) => plainToClass(Edge, edge))
  }
}
