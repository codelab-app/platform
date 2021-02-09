import { Inject, Injectable } from '@nestjs/common'
import { Vertex } from '@prisma/client'
import { CodelabPrismaError } from '../../../../../../../../apps/api/codelab/src/app/CodelabPrismaError'
import { GetVertexInput } from './GetVertexInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetVertexService
  implements TransactionalUseCase<GetVertexInput, Vertex | null> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ id }: GetVertexInput) {
    try {
      return await this.prismaService.vertex.findUnique({
        where: {
          id,
        },
        rejectOnNotFound: true,
      })
    } catch (e) {
      throw new CodelabPrismaError(`Vertex with id: ${id} was not found`, e)
    }
  }
}
