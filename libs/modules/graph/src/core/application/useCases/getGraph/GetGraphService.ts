import { Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
import { GetGraphInput } from './GetGraphInput'
import { PrismaService, TransactionalUseCase } from '@codelab/backend'

@Injectable()
export class GetGraphService
  implements TransactionalUseCase<GetGraphInput, Graph | null> {
  constructor(private readonly prismaService: PrismaService) {}

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
}
