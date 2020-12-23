import { Type, classToPlain, plainToClass } from 'class-transformer'
import { CreateGraphRequest } from '../../application/useCases/createGraph/CreateGraphRequest'
import { SerializedGraphDto } from './dto/SerializedGraphDto'
import { GraphEdges } from './graph-edges'
import { GraphLabel } from './graph-label'
import { GraphVertices } from './graph-vertices'
import { AggregateRoot, TransformBoth, TypeOrmGraph } from '@codelab/backend'

export class Graph extends AggregateRoot<SerializedGraphDto> {
  @Type(() => GraphLabel)
  @TransformBoth(GraphLabel)
  declare label?: GraphLabel

  @Type(() => GraphVertices)
  @TransformBoth(GraphVertices)
  declare vertices: GraphVertices

  @Type(() => GraphEdges)
  @TransformBoth(GraphEdges)
  declare edges: GraphEdges

  /**
   * Used for instantiating a User object
   * @param props
   */
  public static hydrate(props: SerializedGraphDto) {
    const graph = plainToClass(Graph, props)

    return graph
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: CreateGraphRequest): Graph {
    const graph = Graph.hydrate(request)

    return graph
  }

  toPlain() {
    return classToPlain(this) as SerializedGraphDto
  }

  toPersistence(): TypeOrmGraph {
    return plainToClass(TypeOrmGraph, this.toPlain())
  }

  public static arrayToPlain(graphs: Array<Graph>) {
    return classToPlain(graphs) as Array<SerializedGraphDto>
  }
}
