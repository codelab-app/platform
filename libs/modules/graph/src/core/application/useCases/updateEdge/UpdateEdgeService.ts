import { Inject, Injectable } from '@nestjs/common'
import { Edge } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
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
    try {
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
    } catch (e) {
      throw new CodelabPrismaError(`Could not update the edge with id ${id}`, e)
    }
  }
}
