import {
  AwsConfig,
  awsConfig,
  AwsLambdaService,
  AwsS3Service,
  AwsTokens,
  Lambda,
  LambdaPayload,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'

/**
 * This is a wrapper around AWS S3 & Lambda services, to easily help us create functions
 */
@Injectable()
export class LambdaService {
  constructor(
    @Inject(awsConfig.KEY) private readonly _awsConfig: AwsConfig,
    @Inject(AwsTokens.S3) private readonly awsS3Service: AwsS3Service,
    @Inject(AwsTokens.Lambda)
    private readonly awsLambdaService: AwsLambdaService,
  ) {}

  async createLambda(lambda: Lambda) {
    await this.awsS3Service.createBucket(this._awsConfig.awsBucketName)

    await this.awsS3Service.uploadObject(this._awsConfig.awsBucketName, lambda)

    const createFunctionResults = await this.awsLambdaService.createFunction(
      this._awsConfig.awsBucketName,
      lambda,
    )

    // console.log(createFunctionResults)

    return createFunctionResults
  }

  async getLambda(lambda: Lambda) {
    return await this.awsLambdaService.getFunction(lambda)
  }

  async deleteLambda(lambda: Pick<Lambda, 'id'>) {
    await this.awsS3Service.removeObject(this._awsConfig.awsBucketName, lambda)

    await this.awsLambdaService.removeFunction(lambda)
  }

  async updateLambda(lambda: Lambda) {
    await this.awsS3Service.uploadObject(this._awsConfig.awsBucketName, lambda)

    return await this.awsLambdaService.updateFunction(
      this._awsConfig.awsBucketName,
      lambda,
    )
  }

  async executeLambda(lambda: Lambda, payload?: LambdaPayload) {
    return await this.awsLambdaService.executeFunction(lambda, payload)
  }

  // private async deleteBucket(lambda: Lambda) {
  //   return await this.awsS3Service.deleteBucket(lambda.ownerId)
  // }
}
