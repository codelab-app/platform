import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { GetLambdaInput } from '../../get-lambda'
import {
  GetLambdaGql,
  GetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql'
import { CreateLambdaInput } from '../create-lambda.input'
import {
  CreateLambdaGql,
  CreateLambdaMutation,
} from './create-lambda.api.graphql'
import { createLambdaInput } from './create-lambda.data'

describe('CreateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a lambda', async () => {
      await domainRequest(guestApp, CreateLambdaGql, createLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create a lambda', async () => {
      const { createLambda } = await domainRequest<
        CreateLambdaInput,
        CreateLambdaMutation
      >(userApp, CreateLambdaGql, createLambdaInput)

      const results = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        { lambdaId: createLambda.id },
      )

      expect(results.getLambda).toMatchObject(createLambdaInput)
    })
  })
})
