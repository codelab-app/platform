import { Injectable } from '@nestjs/common'
import { GraphDto } from '../../../domain/graph/GraphDto'
import { CreateGraphInput } from './CreateGraphInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class CreateGraphService
  implements TransactionalUseCase<CreateGraphInput, GraphDto> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(request: CreateGraphInput) {
    return await this.prismaService.graph.create({
      data: {
        ...request,
      },
    })
  }
}
