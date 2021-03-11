import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { DeleteLambdaInput } from './DeleteLambdaInput'
import {
  AwsDITokens,
  AwsS3Service,
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'
import { AwsLambdaService } from 'libs/backend/src/infrastructure/persistence/aws/AwsLambdaService'

@Injectable()
export class DeleteLambdaService
  implements TransactionalUseCase<DeleteLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(AwsDITokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsDITokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async execute({ lambdaId }: DeleteLambdaInput) {
    const where = { id: lambdaId }

    const lambda = await this.prismaService.lambda.delete({
      where,
    })

    await this.awsS3Service.removeObject(lambda)
    await this.awsLambdaService.removeFunction(lambda)

    return lambda
  }
}
