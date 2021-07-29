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
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/test/create-lambda.data'

describe('ExecuteLambda', () => {
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
    it('should fail to execute a lambda', async () => {
      // TODO: Enable this spec after completing the execute-lambda.service
      // await domainRequest(
      //   guestApp,
      //   ExecuteLambdaGql,
      //   {},
      //   {
      //     message: 'Unauthorized',
      //   },
      // )
    })
  })

  describe('User', () => {
    it('should execute a lambda', async () => {
      // TODO: Enable this spec after completing the execute-lambda.service
      // const executeLambdaInput: ExecuteLambdaInput = {
      //   lambdaId: lambda.id,
      // }
      //
      // const results = await domainRequest<ExecuteLambdaInput, GetLambdaQuery>(
      //   userApp,
      //   ExecuteLambdaGql,
      //   executeLambdaInput,
      // )
      //
      // // expect(results.getLambda).toMatchObject(lambda)
      // expect(true).toBeTruthy()
    })
  })
})
