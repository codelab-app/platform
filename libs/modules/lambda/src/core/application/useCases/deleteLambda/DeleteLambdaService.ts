import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { DeleteLambdaInput } from './DeleteLambdaInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class DeleteLambdaService
  implements TransactionalUseCase<DeleteLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ lambdaId }: DeleteLambdaInput) {
    const where = { id: lambdaId }

    return await this.prismaService.lambda.delete({
      where,
    })
  }
}
