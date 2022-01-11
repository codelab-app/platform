import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../get-lambda.input'
import { TestGetLambdaGql } from './get-lambda.api.graphql.gen'

describe.skip('GetLambda', () => {
  const testModule = setupLambdaTestModule()
  let getLambdaInput: GetLambdaInput

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const { id } = await testModule.createTestLambda(createLambdaInput)

    getLambdaInput = {
      lambdaId: id,
    }

    expect(id).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get a lambda', async () => {
      await domainRequest(
        testModule.guestApp,
        TestGetLambdaGql,
        getLambdaInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get an existing lambda', async () => {
      const getLambda = await testModule.getLambda(getLambdaInput)

      expect(getLambda).toMatchObject({
        ...createLambdaInput,
        id: getLambdaInput.lambdaId,
      })
    })

    it('should return a null lambda', async () => {
      const getMissingLambdaInput: GetLambdaInput = {
        lambdaId: '0x3a0123',
      }

      const getLambda = await testModule.getLambda(getMissingLambdaInput)

      expect(getLambda).toBeNull()
    })
  })
})
