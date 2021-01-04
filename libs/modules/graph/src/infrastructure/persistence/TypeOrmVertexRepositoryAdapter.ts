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
    const vertex = await this.findOne(searchBy.id)

    return !!vertex
  }

  async createVertex(vertex: Vertex, graph?: Graph): Promise<Vertex> {
    const typeOrmVertex = vertex.toPersistence()

    if (graph) {
      const typeOrmGraph = graph.toPersistence()

      typeOrmVertex.graph = typeOrmGraph
    }

    const newVertex = await this.save(typeOrmVertex)

    return Vertex.hydrate(newVertex)
  }

  async findAll(): Promise<Array<Vertex>> {
    const verticesTypeOrm: Array<TypeOrmVertex> = await this.find()
    const vertices = plainToClass(Vertex, verticesTypeOrm)

    return Promise.resolve(vertices)
  }

  async updateVertex(vertex: Vertex): Promise<Option<Vertex>> {
    let result: Option<Vertex>
    const typeOrmVertex = vertex.toPersistence()
    const existingVertex = await this.findOne(typeOrmVertex.id)

    if (existingVertex) {
      const updatedVertex = await this.save({
        ...existingVertex,
        ...vertex.toPlain(),
      })

      result = O.some(Vertex.hydrate(updatedVertex))
    } else {
      result = O.none
    }

    return result
  }

  async findVertex(by: FindVertexBy): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.findOne(by.id)

    return typeOrmVertex
      ? Promise.resolve(O.some(Vertex.hydrate(typeOrmVertex)))
      : O.none
  }

  async deleteVertex(vertexId: string): Promise<Option<Vertex>> {
    let result: Option<Vertex>
    const typeOrmVertex = await this.findOne(vertexId)

    if (typeOrmVertex) {
      const vertices = await this.remove([typeOrmVertex])

      result = O.some(Vertex.hydrate(vertices[0]))
    } else {
      result = O.none
    }

    return result
  }
}
