import { Prisma } from '@prisma/client'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Vertex } from '../../core/domain/vertex/vertex'
import { PrismaService } from '@codelab/backend'

export class PrismaVertexRepositoryAdapter implements VertexRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(where: Prisma.VertexWhereUniqueInput): Promise<boolean> {
    return !!(await this.prismaService.vertex.findUnique({ where }))
  }

  async create(
    data: Prisma.VertexCreateInput,
    graphId: string,
  ): Promise<Option<Vertex>> {
    try {
      const vertex = await this.prismaService.vertex.create({
        data: {
          ...data,
          graph: {
            connect: {
              id: graphId,
            },
          },
        },
      })

      return O.some(Vertex.hydrate(vertex))
    } catch {
      return O.none
    }
  }

  async findAll(): Promise<Array<Vertex>> {
    const vertices = await this.prismaService.vertex.findMany()

    return vertices.map((vertex) => Vertex.hydrate(vertex))
  }

  async update(
    where: Prisma.VertexWhereUniqueInput,
    data: Prisma.VertexUpdateInput,
  ): Promise<Option<Vertex>> {
    const vertex = await this.prismaService.vertex.update({
      data,
      where,
    })

    return vertex ? O.some(Vertex.hydrate(vertex)) : O.none
  }

  async findOne(where: Prisma.VertexWhereUniqueInput): Promise<Option<Vertex>> {
    const vertex = await this.prismaService.vertex.findUnique({ where })

    return vertex ? O.some(Vertex.hydrate(vertex)) : O.none
  }

  async delete(where: Prisma.VertexWhereUniqueInput): Promise<Option<Vertex>> {
    const vertex = await this.prismaService.vertex.delete({ where })

    return vertex ? O.some(Vertex.hydrate(vertex)) : O.none
  }
}
