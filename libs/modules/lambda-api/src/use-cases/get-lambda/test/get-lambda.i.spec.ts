import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __LambdaFragment,
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  GetLambdaGql,
  GetLambdaQuery,
  GetLambdasGql,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/test/create-lambda.data'
import { GetLambdaInput } from '../get-lambda.input'

describe('GetLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambda: __LambdaFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const results = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

    lambda = results.createLambda

    expect(lambda).toMatchObject(createLambdaInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a lambda', async () => {
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
    it('should get a lambda', async () => {
      const getLambdaInput: GetLambdaInput = {
        lambdaId: lambda.id,
      }

      const results = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        getLambdaInput,
      )

      expect(results.getLambda).toMatchObject(lambda)
    })
  })
})
