import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '../../../domain/graph/Graph'
import { AddChildNodeInput } from './AddChildNodeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class AddChildNodeService
  implements TransactionalUseCase<AddChildNodeInput, Graph> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(request: AddChildNodeInput): Promise<Graph> {
    const { graphId, parentVertexId, vertex, order } = request

    const createdVertex = await this.prismaService.vertex.create({
      data: {
        ...vertex,
      },
    })

    return this.prismaService.graph.update({
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
            // props: {},
            props: vertex.props,
          },
        },
      },
    })
  }
}
