import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  __LambdaFragment,
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  ExecuteLambdaGql,
  ExecuteLambdaInput,
  ExecuteLambdaMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'

describe('ExecuteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambda: __LambdaFragment
  let executeLambdaInput: ExecuteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const results = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

    lambda = results.createLambda

    executeLambdaInput = {
      lambdaId: lambda.id,
    }

    expect(lambda).toMatchObject(createLambdaInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to execute a lambda', async () => {
      await domainRequest(guestApp, ExecuteLambdaGql, executeLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should execute a lambda', async () => {
      const results = await domainRequest<
        ExecuteLambdaInput,
        ExecuteLambdaMutation
      >(userApp, ExecuteLambdaGql, executeLambdaInput)

      expect(results.executeLambda?.payload).toBe('"Hello, World!"')
    })
  })
})
