import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { ExecuteLambdaInput } from '../execute-lambda.input'
import {
  TestExecuteLambdaGql,
  TestExecuteLambdaMutation,
} from './execute-lambda.api.graphql.gen'

describe('ExecuteLambda', () => {
  const testModule = setupLambdaTestModule()
  let executeLambdaInput: ExecuteLambdaInput

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const createLambda = await testModule.createTestLambda(createLambdaInput)

    executeLambdaInput = {
      lambdaId: createLambda.id,
    }

    expect(createLambda.id).toBeDefined()

    // Wait a bit for the lambda to be ready
    await new Promise((r) => setTimeout(r, 5000))
  })

  describe('Guest', () => {
    it('should fail to execute a lambda', async () => {
      await domainRequest(
        testModule.guestApp,
        TestExecuteLambdaGql,
        executeLambdaInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should execute a lambda', async () => {
      const results = await domainRequest<
        ExecuteLambdaInput,
        TestExecuteLambdaMutation
      >(testModule.userApp, TestExecuteLambdaGql, executeLambdaInput)

      expect(results.executeLambda?.payload).toStrictEqual('"Hello, World!"')
    })
  })
})
