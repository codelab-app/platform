import { plainToClass } from 'class-transformer'
import { EntityRepository, Repository } from 'typeorm'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Vertex } from '../../core/domain/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends Repository<TypeOrmVertex>
  implements VertexRepositoryPort {
  createVertex(vertex: Vertex): Promise<Vertex> {
    return Promise.reject()
  }

  async findAll(): Promise<Array<Vertex>> {
    const vertices: Array<TypeOrmVertex> = await this.find()
    const plain = plainToClass(Vertex, vertices)

    return Promise.resolve(plainToClass(Vertex, vertices))
  }
}
