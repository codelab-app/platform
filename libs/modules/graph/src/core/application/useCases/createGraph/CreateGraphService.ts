import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
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
    return await this.prismaService.graph.create({
      data: {
        ...request,
      },
    })
  }
}
