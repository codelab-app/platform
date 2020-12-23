import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { isGraphId } from '../../../../vertex/src/common/utils'
import { FindEdgeBy } from '../../common/CommonTypes'
import { isEdgeById } from '../../common/utils'
import { EdgeRepositoryPort } from '../../core/adapters/EdgeRepositoryPort'
import { Edge } from '../../core/domain/edge/edge'
import { Graph } from '../../core/domain/graph/graph'
import { TypeOrmEdge } from '@codelab/backend'

@EntityRepository(TypeOrmEdge)
export class TypeOrmEdgeRepositoryAdapter
  extends Repository<TypeOrmEdge>
  implements EdgeRepositoryPort {
  async createEdge(edge: Edge, graph?: Graph): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()
    let typeOrmGraph

    if (graph) {
      typeOrmGraph = graph.toPersistence()
      typeOrmEdge.graph = typeOrmGraph
    }

    const newEdge = await this.save(typeOrmEdge)

    return Edge.hydrate(newEdge)
  }

  async deleteEdge(edge: Edge): Promise<Option<Edge>> {
    const typeOrmEdge = edge.toPersistence()
    const edges = await this.remove([typeOrmEdge])

    return edges.length > 0
      ? Promise.resolve(O.some(Edge.hydrate(edges[0])))
      : O.none
  }

  async findAll(): Promise<Array<Edge>> {
    const edgesTypeOrm: Array<TypeOrmEdge> = await this.find()
    const edges = plainToClass(Edge, edgesTypeOrm)

    return Promise.resolve(edges)
  }

  async findEdge(by: FindEdgeBy): Promise<Option<Edge>> {
    let typeOrmEdge

    if (isEdgeById(by)) {
      typeOrmEdge = await this.findOne(by.id)
    }

    return typeOrmEdge
      ? Promise.resolve(O.some(Edge.hydrate(typeOrmEdge)))
      : O.none
  }

  async findEdges(by: FindEdgeBy): Promise<Array<Edge>> {
    let typeOrmEdges: Array<TypeOrmEdge>
    let edges
    let error = ''

    if (isGraphId(by)) {
      typeOrmEdges = await this.find({ where: { graph_id: by.graph_id } })
      edges = plainToClass(Edge, typeOrmEdges)

      return Promise.resolve(edges)
    }

    error = 'Only can search by graph id'

    return Promise.reject(error)
  }

  async updateEdge(existingEdge: Edge, edge: Edge): Promise<Edge> {
    const plainEdge = edge.toPlain()
    const typeOrmExistingEdge = existingEdge.toPersistence()

    const updatedEdge = await this.save({
      ...typeOrmExistingEdge,
      ...plainEdge,
    })

    return Edge.hydrate(updatedEdge)
  }
}
