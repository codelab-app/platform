import { Type, classToPlain, plainToClass } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { SerializedEdgeDto } from './dto/SerializedEdgeDto'
import { EdgeOrder } from './edge-order'
import { EdgeSource } from './edge-source'
import { EdgeTarget } from './edge-target'
import { AggregateRoot, TransformBoth, TypeOrmEdge } from '@codelab/backend'

export class Edge extends AggregateRoot<SerializedEdgeDto> {
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

  /**
   * Used for instantiating a User object
   * @param props
   */
  public static hydrate(props: SerializedEdgeDto) {
    const edge = plainToClass(Edge, props)

    return edge
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: any): Edge {
    const vertex = Edge.hydrate(request)

    return vertex
  }

  toPlain() {
    return classToPlain(this) as SerializedEdgeDto
  }

  toPersistence(): TypeOrmEdge {
    return plainToClass(TypeOrmEdge, this.toPlain())
  }

  public static arrayToPlain(edges: Array<Edge>) {
    return classToPlain(edges) as Array<SerializedEdgeDto>
  }

  public static arrayToPersistence(edges: Array<Edge>): Array<TypeOrmEdge> {
    const plainEdges: Array<SerializedEdgeDto> = classToPlain(
      edges,
    ) as Array<SerializedEdgeDto>

    return plainToClass(TypeOrmEdge, plainEdges)
  }
}
