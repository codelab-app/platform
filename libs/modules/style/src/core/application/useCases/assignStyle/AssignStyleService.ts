import { Inject, Injectable } from '@nestjs/common'
import { Style } from '@prisma/client'
import { AssignStyleInput } from './AssignStyleInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class AssignStyleService
  implements TransactionalUseCase<AssignStyleInput, Style> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ styleId, vertexId }: AssignStyleInput) {
    return await this.prismaService.style.update({
      where: { id: styleId },
      data: {
        vertices: { connect: [{ id: vertexId }] },
      },
    })
  }
}
