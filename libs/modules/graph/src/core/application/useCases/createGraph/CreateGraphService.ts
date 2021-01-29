import { Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
import { CreateGraphInput } from './CreateGraphInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreateGraphService
  implements TransactionalUseCase<CreateGraphInput, Graph> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(request: CreateGraphInput) {
    return await this.prismaService.graph.create({
      data: {
        ...request,
      },
    })
  }
}
