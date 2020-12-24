import { Type, classToPlain, plainToClass } from 'class-transformer'
import { CreateEdgeRequest } from '../application/useCases/createGraph/CreateEdgeRequest'
import { SerializedEdgeDto } from './dto/SerializedEdgeDto'
import { SerializedVertexDto } from './dto/SerializedVertexDto'
import { EdgeOrder } from './edge-order'
import { EdgeProps } from './edge-props'
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

  @Type(() => EdgeProps)
  @TransformBoth(EdgeProps)
  declare properties: EdgeProps

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
  public static create(request: CreateEdgeRequest): Edge {
    const vertex = Edge.hydrate(request)

    return vertex
  }

  toPlain() {
    return classToPlain(this) as SerializedEdgeDto
  }

  toPersistence(): TypeOrmEdge {
    return plainToClass(TypeOrmEdge, this.toPlain())
  }

  public static arrayToPlain(vertices: Array<Edge>) {
    return classToPlain(vertices) as Array<SerializedVertexDto>
  }
}
