import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { ByEdgeCondition } from '../../common/QueryConditions'
import { isEdgeId, isEdgeSource, isEdgeTarget } from '../../common/utils'
import { EdgeRepositoryPort } from '../../core/adapters/EdgeRepositoryPort'
import { Edge } from '../../core/domain/edge'
import { Graph } from '../../core/domain/graph'
import { NOID, TypeOrmEdge } from '@codelab/backend'

@EntityRepository(TypeOrmEdge)
export class TypeOrmEdgeRepositoryAdapter
  extends AbstractRepository<TypeOrmEdge>
  implements EdgeRepositoryPort {
  async exists(searchBy: ByEdgeCondition): Promise<boolean> {
    let edge: TypeOrmEdge | undefined

    if (isEdgeId(searchBy)) {
      edge = await this.repository.findOne(searchBy.edgeId)
    }

    return !!edge
  }

  async findMany(): Promise<Array<Edge>> {
    return Promise.resolve([])
  }

  async create(edge: Edge<NOID>, graph: Graph): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()

    typeOrmEdge.graph = graph.toPersistence()

    const newEdge = await this.repository.save(typeOrmEdge)

    return Edge.hydrate(Edge, newEdge)
  }

  async delete(edge: Edge): Promise<Option<Edge>> {
    const typeOrmEdge = edge.toPersistence()
    const edges = await this.repository.remove([typeOrmEdge])

    return edges.length > 0
      ? Promise.resolve(O.some(Edge.hydrate(Edge, edges[0])))
      : O.none
  }

  async deleteEdgesByVertexId(vertexId: string): Promise<Array<Edge>> {
    const vertexEdges: Array<TypeOrmEdge> = await this.repository.find({
      where: [
        { source: vertexId },
        {
          target: vertexId,
        },
      ],
    })

    const removedEdges: Array<TypeOrmEdge> = await this.repository.remove(
      vertexEdges,
    )

    return Edge.hydrateArray(Edge, removedEdges)
  }

  async findOne(edge: ByEdgeCondition): Promise<Option<Edge>> {
    let typeOrmEdge

    if (isEdgeId(edge)) {
      typeOrmEdge = await this.repository.findOne(edge.edgeId)
    }

    if (isEdgeSource(edge)) {
      typeOrmEdge = await this.repository.findOne({
        where: { source: edge.source },
      })
    }

    if (isEdgeTarget(edge)) {
      typeOrmEdge = await this.repository.findOne({
        where: { target: edge.target },
      })
    }

    return typeOrmEdge
      ? Promise.resolve(O.some(Edge.hydrate(Edge, typeOrmEdge)))
      : O.none
  }

  async update(edge: Edge): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()
    const existingEdge = await this.repository.findOne(typeOrmEdge.id)
    const updatedEdge = await this.repository.save({
      ...existingEdge,
      ...edge.toPlain(),
    })

    return Edge.hydrate(Edge, updatedEdge)
  }

  async updateMany(edges: Array<Edge>): Promise<Array<Edge>> {
    const typeOrmEdges: Array<TypeOrmEdge> = edges.map((edge) =>
      edge.toPersistence(),
    )
    const updatedEdges: Array<TypeOrmEdge> = await this.repository.save(
      typeOrmEdges,
    )

    return updatedEdges.map((edge) => Edge.hydrate(Edge, edge))
  }
}
