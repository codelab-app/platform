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
  GetLambdasGql,
  GetLambdasQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'

describe('GetLambdas', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambdaA: __LambdaFragment
  let lambdaB: __LambdaFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const createLambdaInputA = createLambdaInput
    const createLambdaInputB = { ...createLambdaInput, name: 'HelloWorld2' }

    const resultsA = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInputA)

    const resultsB = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInputB)

    lambdaA = resultsA.createLambda
    lambdaB = resultsB.createLambda

    expect(lambdaA).toMatchObject(resultsA.createLambda)
    expect(lambdaB).toMatchObject(resultsB.createLambda)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get lambdas', async () => {
      await domainRequest(
        guestApp,
        GetLambdasGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get lambdas', async () => {
      const results = await domainRequest<null, GetLambdasQuery>(
        userApp,
        GetLambdasGql,
        null,
      )

      expect(results.getLambdas).toMatchObject([lambdaA, lambdaB])
    })
  })
})
