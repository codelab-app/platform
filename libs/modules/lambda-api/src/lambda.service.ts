// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AwsLambdaService, AwsS3Service, AwsTokens } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { ILambda } from './lib/interfaces/IEventTrigger'

@Injectable()
export class LambdaService {
  constructor(
    @Inject(AwsTokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsTokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async createLambda(lambda: ILambda) {
    await this.awsS3Service.createBucket(lambda.library_id)
    await this.awsS3Service.uploadObject(lambda)

    const createFunctionResults = await this.awsLambdaService.createFunction(
      lambda,
    )

    return createFunctionResults
  }

  async getLambda(lambda: ILambda) {
    return await this.awsLambdaService.getFunction(lambda)
  }

  async deleteLambda(lambda: ILambda) {
    await this.awsS3Service.removeObject(lambda)

    return await this.awsLambdaService.removeFunction(lambda)
  }

  async updateLambda(lambda: ILambda) {
    await this.awsS3Service.uploadObject(lambda)

    return await this.awsLambdaService.updateFunction(lambda)
  }

  async executeLambda(lambda: ILambda, payload: any) {
    return await this.awsLambdaService.executeFunction(lambda, payload)
  }

  async deleteBucket(lambda: ILambda) {
    return await this.awsS3Service.deleteBucket(lambda.library_id)
  }
}
