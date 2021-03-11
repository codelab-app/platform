import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { UpdateLambdaInput } from './UpdateLambdaInput'
import {
  AwsDITokens,
  AwsS3Service,
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'
import { AwsLambdaService } from 'libs/backend/src/infrastructure/persistence/aws/AwsLambdaService'

@Injectable()
export class UpdateLambdaService
  implements TransactionalUseCase<UpdateLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(AwsDITokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsDITokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async execute({ lambdaId, ...data }: UpdateLambdaInput) {
    const lambda = await this.prismaService.lambda.update({
      where: {
        id: lambdaId,
      },
      data,
    })

    await this.awsS3Service.uploadObject(lambda)
    await this.awsLambdaService.updateFunction(lambda)

    return lambda
  }
}
