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
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
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
      const results = await domainRequest<
        CreateLambdaInput,
        CreateLambdaMutation
      >(userApp, CreateLambdaGql, createLambdaInput)

      expect(results.createLambda.id).toBeDefined()
      expect(results.createLambda).toMatchObject({
        ...createLambdaInput,
        ownerId: 'codelab-test-user-id',
      })
    })
  })
})
