import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
} from '@codelab/backend/infra'
import { domainRequest } from '@codelab/backend/shared/testing'
import { setupLambdaTestModule } from '../../../test/setupLambdaTestModule'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { UpdateLambdaInput } from '../update-lambda.input'
import {
  TestUpdateLambdaGql,
  TestUpdateLambdaMutation,
} from './update-lambda.api.graphql.gen'

describe('UpdateLambda', () => {
  const testModule = setupLambdaTestModule()
  let updateLambdaInput: UpdateLambdaInput

  beforeAll(async () => {
    const awsS3Service = testModule.userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = testModule.userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const createLambda = await testModule.createTestLambda(createLambdaInput)

    updateLambdaInput = {
      id: createLambda.id,
      name: 'HelloWorld2',
      body: createLambdaInput.body,
    }

    const getLambda = await testModule.getLambda({
      lambdaId: updateLambdaInput.id,
    })

    expect(getLambda?.name).toStrictEqual(createLambdaInput.name)
  })

  describe('Guest', () => {
    it('should fail to update a lambda', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateLambdaGql,
        updateLambdaInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update a lambda', async () => {
      await domainRequest<UpdateLambdaInput, TestUpdateLambdaMutation>(
        testModule.userApp,
        TestUpdateLambdaGql,
        updateLambdaInput,
      )

      const getLambda = await testModule.getLambda({
        lambdaId: updateLambdaInput.id,
      })

      expect(getLambda?.name).toStrictEqual(updateLambdaInput.name)
    })
  })
})
