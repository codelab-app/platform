import { Inject, Injectable } from '@nestjs/common'
import { Graph } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
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

  async execute({ id }: GetGraphInput) {
    try {
      return await this.prismaService.graph.findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new CodelabPrismaError(`Graph with id ${id} was not found`, e)
    }
  }
}
