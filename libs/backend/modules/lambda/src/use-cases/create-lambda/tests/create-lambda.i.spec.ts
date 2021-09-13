import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
  domainRequest,
} from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { GetLambdaInput } from '../../get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql.gen'
import { CreateLambdaInput } from '../create-lambda.input'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from './create-lambda.api.graphql.gen'
import { createLambdaInput } from './create-lambda.data'

describe('CreateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const awsS3Service = userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a lambda', async () => {
      await domainRequest(guestApp, TestCreateLambdaGql, createLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create a lambda', async () => {
      const { createLambda } = await domainRequest<
        CreateLambdaInput,
        TestCreateLambdaMutation
      >(userApp, TestCreateLambdaGql, createLambdaInput)

      const results = await domainRequest<GetLambdaInput, TestGetLambdaQuery>(
        userApp,
        TestGetLambdaGql,
        { lambdaId: createLambda.id },
      )

      expect(results.getLambda).toMatchObject(createLambdaInput)
    })
  })
})
