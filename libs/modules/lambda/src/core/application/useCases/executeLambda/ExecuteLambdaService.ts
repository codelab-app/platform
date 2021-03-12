import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { ExecuteLambdaInput } from './ExecuteLambdaInput'
import {
  AwsDITokens,
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'
import { AwsLambdaService } from 'libs/backend/src/infrastructure/persistence/aws/AwsLambdaService'

@Injectable()
export class ExecuteLambdaService
  implements TransactionalUseCase<ExecuteLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(AwsDITokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async execute({ lambdaId }: ExecuteLambdaInput) {
    const lambda = await this.prismaService.lambda.findUnique({
      where: {
        id: lambdaId,
      },
      rejectOnNotFound: true,
    })

    const results = await this.awsLambdaService.executeFunction(lambda)

    return lambda
  }
}
