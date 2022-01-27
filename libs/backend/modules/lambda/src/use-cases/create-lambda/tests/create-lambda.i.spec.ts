import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { TestCreateLambdaGql } from './create-lambda.api.graphql.gen'
import { createLambdaInput } from './create-lambda.data'

describe.skip('CreateLambda', () => {
  const testModule = setupLambdaTestModule()

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)
  })

  describe('Guest', () => {
    it('should fail to create a lambda', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateLambdaGql,
        createLambdaInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a lambda', async () => {
      const createLambda = await testModule.createTestLambda(createLambdaInput)

      const getLambda = await testModule.getLambda({
        lambdaId: createLambda.id,
      })

      expect(getLambda).toMatchObject(createLambdaInput)
    })
  })
})
