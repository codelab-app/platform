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
import { CreateLambdaInput } from '../../create-lambda'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql.gen'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../../get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql.gen'
import { UpdateLambdaInput } from '../update-lambda.input'
import {
  TestUpdateLambdaGql,
  TestUpdateLambdaMutation,
} from './update-lambda.api.graphql.gen'

describe('UpdateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updateLambdaInput: UpdateLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const awsS3Service = userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const results = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInput)

    updateLambdaInput = {
      id: results.createLambda.id,
      name: 'HelloWorld2',
      body: createLambdaInput.body,
    }

    const { getLambda } = await domainRequest<
      GetLambdaInput,
      TestGetLambdaQuery
    >(userApp, TestGetLambdaGql, { lambdaId: updateLambdaInput.id })

    expect(getLambda?.name).toBe(createLambdaInput.name)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update a lambda', async () => {
      await domainRequest(guestApp, TestUpdateLambdaGql, updateLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update a lambda', async () => {
      const { updateLambda } = await domainRequest<
        UpdateLambdaInput,
        TestUpdateLambdaMutation
      >(userApp, TestUpdateLambdaGql, updateLambdaInput)

      expect(updateLambda?.name).toBe(updateLambdaInput.name)
    })
  })
})
