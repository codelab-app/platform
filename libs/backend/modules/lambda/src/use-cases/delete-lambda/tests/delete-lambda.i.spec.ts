import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../../get-lambda'
import { DeleteLambdaInput } from '../delete-lambda.input'
import {
  TestDeleteLambdaGql,
  TestDeleteLambdaMutation,
} from './delete-lambda.api.graphql.gen'

describe('DeleteLambda', () => {
  const testModule = setupLambdaTestModule()
  let deleteLambdaInput: DeleteLambdaInput

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const createLambda = await testModule.createTestLambda(createLambdaInput)

    deleteLambdaInput = {
      lambdaId: createLambda.id,
    }

    expect(createLambda.id).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to delete a lambda', async () => {
      await domainRequest(
        testModule.guestApp,
        TestDeleteLambdaGql,
        deleteLambdaInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete a lambda', async () => {
      const getLambdaInput: GetLambdaInput = {
        lambdaId: deleteLambdaInput.lambdaId,
      }

      await domainRequest<DeleteLambdaInput, TestDeleteLambdaMutation>(
        testModule.userApp,
        TestDeleteLambdaGql,
        deleteLambdaInput,
      )

      const getLambda = await testModule.getLambda(getLambdaInput)

      expect(getLambda).toBeNull()
    })
  })
})
