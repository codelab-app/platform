import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  GetLambdaGql,
  GetLambdaQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { GetLambdaInput } from '../../get-lambda'
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
