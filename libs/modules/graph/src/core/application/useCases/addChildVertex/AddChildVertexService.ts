import { Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { AddChildVertexInput } from './AddChildVertexInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class AddChildVertexService
  implements TransactionalUseCase<AddChildVertexInput, Vertex> {
  constructor(private readonly prismaService: PrismaService) {}

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
