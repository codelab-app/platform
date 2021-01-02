import { Type, classToPlain, plainToClass } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { SerializedVertexDto } from './dto/SerializedVertexDto'
import { VertexGraphId } from './vertex-graphId'
import { VertexParent } from './vertex-parent'
import { VertexType } from './vertex-type'
import { AggregateRoot, TransformBoth, TypeOrmVertex } from '@codelab/backend'

export class Vertex extends AggregateRoot<SerializedVertexDto> {
  @Type(() => VertexType)
  @TransformBoth(VertexType)
  declare type: VertexType

  @Type(() => Object)
  @IsOptional()
  declare props?: any

  @Type(() => VertexParent)
  @TransformBoth(VertexParent)
  @IsOptional()
  declare parent?: VertexParent

  @Type(() => VertexGraphId)
  @TransformBoth(VertexGraphId)
  @IsOptional()
  declare graphId?: VertexGraphId

  /**
   * Used for instantiating a User object
   * @param props
   */
  public static hydrate(props: SerializedVertexDto) {
    const vertex = plainToClass(Vertex, props)

    return vertex
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: any): Vertex {
    const vertex = Vertex.hydrate(request)

    return vertex
  }

  toPlain() {
    return classToPlain(this) as SerializedVertexDto
  }

  toPersistence(): TypeOrmVertex {
    return plainToClass(TypeOrmVertex, this.toPlain())
  }

  public static arrayToPlain(vertices: Array<Vertex>) {
    return classToPlain(vertices) as Array<SerializedVertexDto>
  }
}
