import { Inject, Injectable } from '@nestjs/common'
import { Prisma, Vertex } from '@prisma/client'
import { AddChildVertexInput } from './AddChildVertexInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class AddChildVertexService
  implements TransactionalUseCase<AddChildVertexInput, Vertex> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ parentVertexId, vertex, order }: AddChildVertexInput) {
    const graph = await this.prismaService.graph.findFirst({
      where: {
        vertices: {
          some: {
            id: parentVertexId,
          },
        },
      },
    })

    if (!graph) {
      throw new Error('Graph not found')
    }

    const createdVertex = await this.prismaService.vertex.create({
      data: {
        ...vertex,
        graph: {
          connect: {
            id: graph.id,
          },
        },
      },
    })

    // Update props with necessary detail
    await this.prismaService.vertex.update({
      where: {
        id: createdVertex.id,
      },
      data: {
        props: {
          ...(createdVertex.props as Prisma.InputJsonObject),
          key: createdVertex.id,
        },
      },
    })

    await this.prismaService.graph.update({
      where: {
        id: graph.id,
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
            props: vertex.props,
          },
        },
      },
    })

    return createdVertex
  }
}
