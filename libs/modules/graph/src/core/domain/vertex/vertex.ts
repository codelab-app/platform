import { Type, plainToClass } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { SerializedVertexDto } from './dto/SerializedVertexDto'
import { VertexGraphId } from './vertex-graphId'
import { VertexType } from './vertex-type'
import {
  AggregateRoot,
  NOID,
  TransformBoth,
  TypeOrmVertex,
  UUID,
} from '@codelab/backend'

export class Vertex<ID extends UUID | NOID = UUID> extends AggregateRoot<
  SerializedVertexDto,
  ID
> {
  @Type(() => VertexType)
  @TransformBoth(VertexType)
  declare type: VertexType

  @Type(() => Object)
  @IsOptional()
  declare props?: any

  // @Type(() => VertexParent)
  // @TransformBoth(VertexParent)
  // @IsOptional()
  // declare parent?: VertexParent

  @Type(() => VertexGraphId)
  @TransformBoth(VertexGraphId)
  // @IsOptional()
  declare graphId: VertexGraphId

  toPersistence(): TypeOrmVertex {
    return plainToClass(TypeOrmVertex, this.toPlain())
  }
}
