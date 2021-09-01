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
import { GetLambdasGql, GetLambdasQuery } from './get-lambdas.api.graphql'

describe('GetLambdas', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambdaAId: string
  let lambdaBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const createLambdaInputA = createLambdaInput
    const createLambdaInputB = { ...createLambdaInput, name: 'HelloWorld2' }

    const lambdaA = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInputA)

    const lambdaB = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInputB)

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
      await domainRequest(guestApp, GetLambdasGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get lambdas', async () => {
      const results = await domainRequest<null, GetLambdasQuery>(
        userApp,
        GetLambdasGql,
        null,
      )

      expect(results.getLambdas).toMatchObject([
        { id: lambdaAId },
        { id: lambdaBId },
      ])
    })
  })
})
