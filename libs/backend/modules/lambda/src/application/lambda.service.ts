import { NotFoundError } from '@codelab/backend/abstract/core'
import type { AwsConfig, LambdaPayload } from '@codelab/backend/infra'
import {
  awsConfig,
  AwsLambdaService,
  AwsS3Service,
  AwsTokens,
  Lambda,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { updateLambdaInvalidState } from './lambda.error'

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
    if (!lambda.id) {
      throw new Error(
        'Lambda has to be persisted in the db before creating in AWS',
      )
    }

    await this.awsS3Service.createBucket(this._awsConfig.awsBucketName)

    await this.awsS3Service.uploadObject(this._awsConfig.awsBucketName, lambda)

    const createFunctionResults = await this.awsLambdaService.createFunction(
      this._awsConfig.awsBucketName,
      lambda,
    )

    return createFunctionResults
  }

  async getLambda(lambda: Lambda) {
    if (!lambda.id) {
      throw new Error(
        'Lambda has to be persisted in the db before getting it from AWS',
      )
    }

    return await this.awsLambdaService.getFunction(lambda)
  }

  async deleteLambda(lambda: Pick<Lambda, 'id'>) {
    if (!lambda.id) {
      throw new Error(
        'Lambda has to be persisted in the db before deleting it from AWS',
      )
    }

    await this.awsS3Service.removeObject(this._awsConfig.awsBucketName, lambda)

    await this.awsLambdaService.removeFunction(lambda)
  }

  async updateLambda(lambda: Lambda) {
    if (!lambda.id) {
      throw new Error(
        'Lambda has to be persisted in the db before updating it in AWS',
      )
    }

    const currentLambda = await this.awsLambdaService.getFunction(lambda)

    if (!currentLambda) {
      throw new NotFoundError('lambda not found')
    }

    const state = String(currentLambda.Configuration?.State)

    if (['Pending', 'Failed'].includes(state)) {
      throw updateLambdaInvalidState(state)
    }

    await this.awsS3Service.uploadObject(this._awsConfig.awsBucketName, lambda)

    await this.awsLambdaService.updateFunction(
      this._awsConfig.awsBucketName,
      lambda,
    )
  }

  async executeLambda(lambda: Lambda, payload?: LambdaPayload) {
    if (!lambda.id) {
      throw new Error(
        'Lambda has to be persisted in the db before executing it',
      )
    }

    return await this.awsLambdaService.executeFunction(lambda, payload)
  }

  // private async deleteBucket(lambda: Lambda) {
  //   return await this.awsS3Service.deleteBucket(lambda.ownerId)
  // }
}
