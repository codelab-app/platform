import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { UnAssignStyleInput } from './UnAssignStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UnAssignStyleService
  implements TransactionalUseCase<UnAssignStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ styleId, vertexId }: UnAssignStyleInput) {
    return await this.prismaService.style.update({
      where: { id: styleId },
      data: {
        vertices: { disconnect: [{ id: vertexId }] },
      },
    })
  }
}
