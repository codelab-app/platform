import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import {
  TestGetLambdasGql,
  TestGetLambdasQuery,
} from './get-lambdas.api.graphql.gen'

describe('GetLambdas', () => {
  const testModule = setupLambdaTestModule()
  let lambdaAId: string
  let lambdaBId: string

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const createLambdaInputA = createLambdaInput
    const createLambdaInputB = { ...createLambdaInput, name: 'HelloWorld2' }
    const lambdaA = await testModule.createTestLambda(createLambdaInputA)
    const lambdaB = await testModule.createTestLambda(createLambdaInputB)

    lambdaAId = lambdaA.id
    lambdaBId = lambdaB.id

    expect(lambdaA.id).toBeDefined()
    expect(lambdaB.id).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get lambdas', async () => {
      await domainRequest(testModule.guestApp, TestGetLambdasGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get lambdas', async () => {
      const results = await domainRequest<null, TestGetLambdasQuery>(
        testModule.userApp,
        TestGetLambdasGql,
        null,
      )

      expect(results.getLambdas).toMatchObject([
        { id: lambdaAId },
        { id: lambdaBId },
      ])
    })
  })
})
