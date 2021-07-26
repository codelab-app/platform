// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AwsLambdaService, AwsS3Service, AwsTokens } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Lambda } from './lambda.model'

/**
 * This is a wrapper around AWS S3 & Lambda services, to easily help us create functions
 */
@Injectable()
export class LambdaService {
  constructor(
    @Inject(AwsTokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsTokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async createLambda(lambda: Lambda) {
    await this.awsS3Service.createBucket(lambda.ownerId)
    await this.awsS3Service.uploadObject(lambda)

    const createFunctionResults = await this.awsLambdaService.createFunction(
      lambda,
    )

    return createFunctionResults
  }

  async getLambda(lambda: Lambda) {
    return await this.awsLambdaService.getFunction(lambda)
  }

  async deleteLambda(lambda: Lambda) {
    await this.awsS3Service.removeObject(lambda)

    return await this.awsLambdaService.removeFunction(lambda)
  }

  async updateLambda(lambda: Lambda) {
    await this.awsS3Service.uploadObject(lambda)

    return await this.awsLambdaService.updateFunction(lambda)
  }

  async executeLambda(lambda: Lambda, payload: any) {
    return await this.awsLambdaService.executeFunction(lambda, payload)
  }

  async deleteBucket(lambda: Lambda) {
    return await this.awsS3Service.deleteBucket(lambda.ownerId)
  }
}
