import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { UpdateLambdaInput } from './UpdateLambdaInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class UpdateLambdaService
  implements TransactionalUseCase<UpdateLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ lambdaId, ...data }: UpdateLambdaInput) {
    return await this.prismaService.lambda.update({
      where: {
        id: lambdaId,
      },
      data,
    })
  }
}
