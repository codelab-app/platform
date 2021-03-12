import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from '@prisma/client'
import { CreateLambdaInput } from './CreateLambdaInput'
import {
  AwsS3Service,
  PrismaDITokens,
  PrismaService,
  TransactionalUseCase,
} from '@codelab/backend'
import { AwsDITokens } from 'libs/backend/src/infrastructure/persistence/aws/AwsDITokens'
import { AwsLambdaService } from 'libs/backend/src/infrastructure/persistence/aws/AwsLambdaService'

@Injectable()
export class CreateLambdaService
  implements TransactionalUseCase<CreateLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(AwsDITokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsDITokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async execute({ appId, ...request }: CreateLambdaInput) {
    const lambda = await this.prismaService.lambda.create({
      data: {
        ...request,
        app: {
          connect: {
            id: appId,
          },
        },
      },
    })

    await this.awsS3Service.createBucket(appId)
    await this.awsS3Service.uploadObject(lambda)

    const createFunctionResults = await this.awsLambdaService.createFunction(
      lambda,
    )

    console.log(createFunctionResults)

    return lambda
  }
}
