import { Type, plainToClass } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { SerializedEdgeDto } from './dto/SerializedEdgeDto'
import { EdgeOrder } from './edge-order'
import { EdgeSource } from './edge-source'
import { EdgeTarget } from './edge-target'
import {
  AggregateRoot,
  NOID,
  TransformBoth,
  TypeOrmEdge,
  UUID,
} from '@codelab/backend'

export class Edge<ID extends UUID | NOID = UUID> extends AggregateRoot<
  SerializedEdgeDto,
  ID
> {
  @Type(() => EdgeSource)
  @TransformBoth(EdgeSource)
  declare source: EdgeSource

  @Type(() => EdgeTarget)
  @TransformBoth(EdgeTarget)
  declare target: EdgeTarget

  @Type(() => EdgeOrder)
  @TransformBoth(EdgeOrder)
  declare order: EdgeOrder

  @Type(() => Object)
  @IsOptional()
  declare props?: any

  toPersistence(): TypeOrmEdge {
    return plainToClass(TypeOrmEdge, this.toPlain())
  }
}
