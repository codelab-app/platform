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
  CreateLambdaGql,
  CreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { ExecuteLambdaInput } from '../execute-lambda.input'
import {
  ExecuteLambdaGql,
  ExecuteLambdaMutation,
} from './execute-lambda.api.graphql'

describe('ExecuteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let executeLambdaInput: ExecuteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const { createLambda } = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

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
