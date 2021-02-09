import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { CreateGraphInput } from './CreateGraphInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class CreateGraphService
  implements TransactionalUseCase<CreateGraphInput, Graph> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(request: CreateGraphInput) {
    try {
      return await this.prismaService.graph.create({
        data: {
          ...request,
        },
      })
    } catch (e) {
      throw new CodelabPrismaError('Could not create graph', e)
    }
  }
}
