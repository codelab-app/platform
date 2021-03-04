import * as path from 'path'
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

@Injectable()
export class CreateLambdaService
  implements TransactionalUseCase<CreateLambdaInput, Lambda> {
  constructor(
    @Inject(PrismaDITokens.PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(AwsDITokens.S3) private readonly awsS3Service: AwsS3Service,
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

    const zipFilePath = path.resolve(
      process.cwd(),
      'libs/modules/lambda/src/core/application/useCases/createLambda/function.zip',
    )

    await this.awsS3Service.uploadObject(appId, zipFilePath)

    return lambda
  }
}
