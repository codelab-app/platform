import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { CreateLambdaInput } from '../../create-lambda/create-lambda.input'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql.gen'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { ExecuteLambdaInput } from '../execute-lambda.input'
import {
  TestExecuteLambdaGql,
  TestExecuteLambdaMutation,
} from './execute-lambda.api.graphql.gen'

describe('ExecuteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let executeLambdaInput: ExecuteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const { createLambda } = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInput)

    executeLambdaInput = {
      lambdaId: createLambda.id,
    }

    expect(createLambda.id).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to execute a lambda', async () => {
      await domainRequest(guestApp, TestExecuteLambdaGql, executeLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should execute a lambda', async () => {
      const results = await domainRequest<
        ExecuteLambdaInput,
        TestExecuteLambdaMutation
      >(userApp, TestExecuteLambdaGql, executeLambdaInput)

      expect(results.executeLambda?.payload).toBe('"Hello, World!"')
    })
  })
})
