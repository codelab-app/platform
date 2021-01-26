import { Graph } from '../../../domain/graph/Graph'
import { AddChildNodeInput } from './AddChildNodeInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

export class AddChildNodeService
  implements TransactionalUseCase<AddChildNodeInput, Graph> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(request: AddChildNodeInput): Promise<Graph> {
    const { graphId, parentVertexId, vertex, order } = request

    const createdVertex = await this.prismaService.vertex.create({
      data: {
        ...vertex,
      },
    })

    return await this.prismaService.graph.update({
      where: {
        id: graphId,
      },
      data: {
        vertices: {
          connect: {
            id: createdVertex.id,
          },
        },
        edges: {
          create: {
            source: parentVertexId,
            target: createdVertex.id,
            order,
            props: {},
          },
        },
      },
    })
  }
}
