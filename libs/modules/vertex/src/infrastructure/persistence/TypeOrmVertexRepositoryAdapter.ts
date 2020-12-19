import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindVertexBy } from '../../common/CommonTypes'
import { isId } from '../../common/utils'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Vertex } from '../../core/domain/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends Repository<TypeOrmVertex>
  implements VertexRepositoryPort {
  async createVertex(vertex: Vertex): Promise<Vertex> {
    const newVertex = await this.save(vertex.toPlain())

    return Vertex.hydrate(newVertex)
  }

  async findAll(): Promise<Array<Vertex>> {
    const vertices: Array<TypeOrmVertex> = await this.find()
    const plain = plainToClass(Vertex, vertices)

    return Promise.resolve(plain)
  }

  async findVertex(by: FindVertexBy): Promise<Option<Vertex>> {
    let typeOrmVertex

    if (isId(by)) {
      typeOrmVertex = await this.findOne(by.id)
    }

    const h = Vertex.hydrate(typeOrmVertex as any)

    return typeOrmVertex
      ? Promise.resolve(O.some(Vertex.hydrate(typeOrmVertex)))
      : O.none
  }
}
