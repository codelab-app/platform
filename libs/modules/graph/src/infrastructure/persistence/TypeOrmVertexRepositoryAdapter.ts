import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindVertexBy } from '../../common/CommonTypes'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { Vertex } from '../../core/domain/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends Repository<TypeOrmVertex>
  implements VertexRepositoryPort {
  async exists(searchBy: FindVertexBy): Promise<boolean> {
    return !!(await this.findOne(searchBy.id))
  }

  async createVertex(vertex: Vertex, graph: Graph): Promise<Vertex> {
    const newVertex = await this.save({
      ...vertex.toPersistence(),
      graph: graph.toPersistence(),
    })

    return plainToClass(Vertex, newVertex)
  }

  async findAll(): Promise<Array<Vertex>> {
    const verticesTypeOrm: Array<TypeOrmVertex> = await this.find()
    const vertices = plainToClass(Vertex, verticesTypeOrm)

    return Promise.resolve(vertices)
  }

  async updateVertex(vertex: Vertex): Promise<Option<Vertex>> {
    const existingVertex = await this.findOne(vertex.id.value)

    if (!existingVertex) {
      return O.none
    }

    const updatedVertex = await this.save({
      ...existingVertex,
      ...vertex.toPlain(),
    })

    return O.some(plainToClass(Vertex, updatedVertex))
  }

  async findVertex(by: FindVertexBy): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.findOne(by.id)

    if (!typeOrmVertex) {
      return O.none
    }

    return O.some(plainToClass(Vertex, typeOrmVertex))
  }

  async deleteVertex(vertexId: string): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.findOne(vertexId)

    if (!typeOrmVertex) {
      return O.none
    }

    const vertices = await this.remove([typeOrmVertex])

    return O.some(plainToClass(Vertex, vertices[0]))
  }
}
