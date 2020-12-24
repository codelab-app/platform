import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindEdgeBy } from '../../common/CommonTypes'
import { EdgeRepositoryPort } from '../../core/adapters/EdgeRepositoryPort'
import { Edge } from '../../core/domain/edge'
import { TypeOrmEdge } from '@codelab/backend'

@EntityRepository(TypeOrmEdge)
export class TypeOrmEdgeRepositoryAdapter
  extends Repository<TypeOrmEdge>
  implements EdgeRepositoryPort {
  async exists(searchBy: FindEdgeBy): Promise<boolean> {
    const edge = await this.findOne(searchBy.id)

    return !!edge
  }

  async createEdge(edge: Edge): Promise<Edge> {
    const typeOrmEdge = edge.toPersistence()
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
    const typeOrmEdge = await this.findOne(by.id)

    return typeOrmEdge
      ? Promise.resolve(O.some(Edge.hydrate(typeOrmEdge)))
      : O.none
  }

  // async findEdges(by: FindEdgeBy): Promise<Array<Edge>> {
  //   let typeOrmEdges: Array<TypeOrmEdge>
  //   let edges
  //   let error = ''

  //   if (isGraphId(by)) {
  //     typeOrmEdges = await this.find({ where: { graph_id: by.graph_id } })
  //     edges = plainToClass(Edge, typeOrmEdges)

  //     return Promise.resolve(edges)
  //   }

  //   error = 'Only can search by graph id'

  //   return Promise.reject(error)
  // }

  async updateEdge(edge: Edge): Promise<Edge> {
    const updatedEdge = await this.save({
      ...edge.toPlain(),
    })

    return Edge.hydrate(updatedEdge)
  }
}
