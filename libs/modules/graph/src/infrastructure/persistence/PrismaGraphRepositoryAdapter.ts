import { Prisma } from '@prisma/client'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph/graph'
import { PrismaService } from '@codelab/backend'

export class PrismaGraphRepositoryAdapter implements GraphRepositoryPort {
  constructor(public readonly prismaService: PrismaService) {}

  async create(data: Prisma.GraphCreateInput): Promise<Option<Graph>> {
    try {
      const graph = await this.prismaService.graph.create({
        data,
      })

      return O.some(Graph.hydrate(graph))
    } catch (e) {
      return O.none
    }
  }

  async delete(where: Prisma.GraphWhereUniqueInput): Promise<Option<Graph>> {
    const graph = await this.prismaService.graph.delete({ where })

    return graph ? O.some(Graph.hydrate(graph)) : O.none
  }

  async update(
    where: Prisma.GraphWhereUniqueInput,
    data: Prisma.GraphUpdateInput,
  ): Promise<Option<Graph>> {
    const graph = await this.prismaService.graph.update({
      data,
      where,
    })

    return graph ? O.some(Graph.hydrate(graph)) : O.none
  }

  async findOne(where: Prisma.GraphWhereUniqueInput): Promise<Option<Graph>> {
    const graph = await this.prismaService.graph.findUnique({
      where,
    })

    return graph ? O.some(Graph.hydrate(graph)) : O.none
  }
}
