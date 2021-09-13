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
import {
  TestGetLambdasGql,
  TestGetLambdasQuery,
} from './get-lambdas.api.graphql.gen'

describe('GetLambdas', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambdaAId: string
  let lambdaBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const awsS3Service = userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const createLambdaInputA = createLambdaInput
    const createLambdaInputB = { ...createLambdaInput, name: 'HelloWorld2' }

    const lambdaA = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInputA)

    const lambdaB = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInputB)

    lambdaAId = lambdaA.createLambda.id
    lambdaBId = lambdaB.createLambda.id

    expect(lambdaA.createLambda.id).toBeDefined()
    expect(lambdaB.createLambda.id).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get lambdas', async () => {
      await domainRequest(guestApp, TestGetLambdasGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get lambdas', async () => {
      const results = await domainRequest<null, TestGetLambdasQuery>(
        userApp,
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
