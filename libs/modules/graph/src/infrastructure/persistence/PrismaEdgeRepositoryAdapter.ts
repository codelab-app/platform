import { Prisma } from '@prisma/client'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { zip } from 'lodash'
import { EdgeRepositoryPort } from '../../core/adapters/EdgeRepositoryPort'
import { Edge } from '../../core/domain/edge/edge'
import { Graph } from '../../core/domain/graph/graph'
import { PrismaService } from '@codelab/backend'

export class PrismaEdgeRepositoryAdapter implements EdgeRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(where: Prisma.EdgeWhereUniqueInput): Promise<boolean> {
    return !!(await this.prismaService.edge.findUnique({
      where,
    }))
  }

  async create(
    data: Prisma.EdgeCreateInput,
    graph: Graph,
  ): Promise<Option<Edge>> {
    try {
      const edge = await this.prismaService.edge.create({ data })

      return O.some(Edge.hydrate(edge))
    } catch (e) {
      return O.none
    }
  }

  async delete(where: Prisma.EdgeWhereUniqueInput): Promise<Option<Edge>> {
    const edge = await this.prismaService.edge.delete({
      where,
    })

    return edge ? O.some(Edge.hydrate(edge)) : O.none
  }

  async deleteMany(where: Prisma.EdgeWhereInput): Promise<number> {
    const { count } = await this.prismaService.edge.deleteMany({
      where,
    })

    return count
  }

  async findOne(where: Prisma.EdgeWhereUniqueInput): Promise<Option<Edge>> {
    const edge = await this.prismaService.edge.findUnique({
      where,
    })

    return edge ? O.some(Edge.hydrate(edge)) : O.none
  }

  async update(
    where: Prisma.EdgeWhereUniqueInput,
    data: Prisma.EdgeUpdateInput,
  ): Promise<Option<Edge>> {
    const edge = await this.prismaService.user.update({
      data,
      where,
    })

    return edge ? O.some(Edge.hydrate(edge)) : O.none
  }

  async updateMany(
    whereMany: Array<Prisma.EdgeWhereUniqueInput>,
    dataMany: Array<Prisma.EdgeUpdateInput>,
  ): Promise<Array<Edge>> {
    const mutations = zip(whereMany, dataMany).map(([where, data]: any) => {
      return this.prismaService.user.update({
        data,
        where,
      })
    })

    return (await Promise.all(mutations)).map((edge) => Edge.hydrate(edge))
  }
}
