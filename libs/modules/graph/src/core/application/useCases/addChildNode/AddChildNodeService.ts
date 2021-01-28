import { Inject, Injectable } from '@nestjs/common'
import { GraphDto } from '../../../domain/graph/GraphDto'
import { AddChildNodeInput } from './AddChildNodeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class AddChildNodeService
  implements TransactionalUseCase<AddChildNodeInput, GraphDto> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(request: AddChildNodeInput) {
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
