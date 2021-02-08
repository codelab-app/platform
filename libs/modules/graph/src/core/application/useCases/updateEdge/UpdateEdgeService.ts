import { Inject, Injectable } from '@nestjs/common'
import { Edge } from '@prisma/client'
import { UpdateEdgeInput } from './UpdateEdgeInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateEdgeService
  implements TransactionalUseCase<UpdateEdgeInput, Edge> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ id, type, source, target }: UpdateEdgeInput) {
    return await this.prismaService.edge.update({
      where: {
        id,
      },
      data: {
        type,
        source,
        target,
      },
    })
  }
}
