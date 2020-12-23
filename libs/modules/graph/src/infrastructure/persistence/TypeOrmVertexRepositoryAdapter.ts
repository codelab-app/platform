import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindVertexBy } from '../../common/CommonTypes'
import {
  isEdgeByGraphId,
  isEdgeById,
  isVertexByGraphId,
  isVertexById,
} from '../../common/utils'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Graph } from '../../core/domain/graph/graph'
import { Vertex } from '../../core/domain/vertex/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends Repository<TypeOrmVertex>
  implements VertexRepositoryPort {
  async exists(searchBy: FindVertexBy): Promise<boolean> {
    let entity

    if (isVertexById(searchBy)) {
      entity = await this.findOne(searchBy.id)
    }

    if (isVertexByGraphId(searchBy)) {
      entity = await this.findOne({ where: { graph_id: searchBy.graph_id } })
    }

    return !!entity
  }

  async createVertex(vertex: Vertex, graph?: Graph): Promise<Vertex> {
    const typeOrmVertex: TypeOrmVertex = vertex.toPersistence()
    let typeOrmGraph

    if (graph) {
      typeOrmGraph = graph.toPersistence()
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

  async updateVertex(existingVertex: Vertex, vertex: Vertex): Promise<Vertex> {
    const plainVertex = vertex.toPlain()
    const typeOrmExistingVertex = plainToClass(
      TypeOrmVertex,
      existingVertex.toPlain(),
    )

    const updatedVertex = await this.save({
      ...typeOrmExistingVertex,
      ...plainVertex,
    })

    return Vertex.hydrate(updatedVertex)
  }

  async findVertex(by: FindVertexBy): Promise<Option<Vertex>> {
    let typeOrmVertex

    if (isEdgeById(by)) {
      typeOrmVertex = await this.findOne(by.id)
    }

    return typeOrmVertex
      ? Promise.resolve(O.some(Vertex.hydrate(typeOrmVertex)))
      : O.none
  }

  async findVertices(by: FindVertexBy): Promise<Array<Vertex>> {
    let typeOrmVertices: Array<TypeOrmVertex>
    let vertices
    let error = ''

    if (isEdgeByGraphId(by)) {
      typeOrmVertices = await this.find({ where: { graph_id: by.graph_id } })
      vertices = plainToClass(Vertex, typeOrmVertices)

      return Promise.resolve(vertices)
    }

    error = 'Only can search by graph id'

    return Promise.reject(error)
  }

  async deleteVertex(vertex: Vertex): Promise<Option<Vertex>> {
    const plainVertex = vertex.toPlain()
    const typeOrmVertex = plainToClass(TypeOrmVertex, plainVertex)
    const vertices = await this.remove([typeOrmVertex])

    return vertices.length > 0
      ? Promise.resolve(O.some(Vertex.hydrate(vertices[0])))
      : O.none
  }
}
