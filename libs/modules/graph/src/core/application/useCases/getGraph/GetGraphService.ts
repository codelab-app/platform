import { Inject, Injectable } from '@nestjs/common'
import { GraphDto } from '../../../domain/graph/GraphDto'
import { GetGraphByInput } from './GetGraphByInput'
import { GetGraphInput } from './GetGraphInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetGraphService
  implements TransactionalUseCase<GetGraphInput, GraphDto | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ id }: GetGraphInput) {
    try {
      return await this.prismaService.graph.findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new Error(`Graph with id ${id} was not found`)
    }
  }

  async getGraphsByPageId(pageId: string) {
    return await this.prismaService.graph.findMany({
      where: {
        pageId,
      },
    })
  }

  async getGraphBy({ appId, pageId }: GetGraphByInput): Promise<GraphDto> {
    let graphs: Array<GraphDto> = []

    if (appId && pageId) {
      throw new Error('Cannot search by both appId and pageId')
    }

    if (pageId) {
      graphs = await this.prismaService.graph.findMany({
        where: {
          pageId,
        },
      })
    }

    if (appId) {
      graphs = await this.prismaService.graph.findMany({
        where: {
          appId,
        },
      })
    }

    if (graphs.length > 0) {
      return graphs[0]
    }

    throw new Error(`Graph not been found`)
  }
}
