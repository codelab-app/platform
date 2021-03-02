import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { GetLambdaInput } from './GetLambdaInput'
import {
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'

@Injectable()
export class GetLambdaService
  implements TransactionalUseCase<GetLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute({ lambdaId }: GetLambdaInput) {
    return await this.prismaService.lambda.findUnique({
      where: {
        id: lambdaId,
      },
      rejectOnNotFound: true,
    })
  }
}
