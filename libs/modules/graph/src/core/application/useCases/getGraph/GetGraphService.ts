import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '../../../domain/graph/Graph'
import { GetGraphInput } from './GetGraphInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetGraphService
  implements TransactionalUseCase<GetGraphInput, Graph | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ id }: GetGraphInput): Promise<Graph | null> {
    return await this.prismaService.graph.findUnique({
      where: {
        id,
      },
    })
  }
}
