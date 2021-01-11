import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { ByVertexCondition } from '../../common/QueryConditions'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { Vertex } from '../../core/domain/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends AbstractRepository<TypeOrmVertex>
  implements VertexRepositoryPort {
  async exists(searchBy: ByVertexCondition): Promise<boolean> {
    return !!(await this.repository.findOne(searchBy.vertexId))
  }

  async create(vertex: Vertex, graph: Graph): Promise<Vertex> {
    const newVertex = await this.repository.save({
      ...vertex.toPersistence(),
      graph: graph.toPersistence(),
    })

    return plainToClass(Vertex, newVertex)
  }

  async findAll(): Promise<Array<Vertex>> {
    const verticesTypeOrm: Array<TypeOrmVertex> = await this.repository.find()
    const vertices = plainToClass(Vertex, verticesTypeOrm)

    return Promise.resolve(vertices)
  }

  async update(vertex: Vertex): Promise<Option<Vertex>> {
    const existingVertex = await this.repository.findOne(vertex.id.value)

    if (!existingVertex) {
      return O.none
    }

    const updatedVertex = await this.repository.save({
      ...existingVertex,
      ...vertex.toPlain(),
    })

    return O.some(plainToClass(Vertex, updatedVertex))
  }

  async findOne(vertex: ByVertexCondition): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.repository.findOne(vertex.vertexId)

    if (!typeOrmVertex) {
      return O.none
    }

    return O.some(plainToClass(Vertex, typeOrmVertex))
  }

  async delete(vertexId: string): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.repository.findOne(vertexId)

    if (!typeOrmVertex) {
      return O.none
    }

    const vertices = await this.repository.remove([typeOrmVertex])

    return O.some(plainToClass(Vertex, vertices[0]))
  }

  findMany(): Promise<Array<Vertex>> {
    return Promise.resolve([])
  }
}
