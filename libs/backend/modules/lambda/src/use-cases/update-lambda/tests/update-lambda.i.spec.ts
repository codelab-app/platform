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
import { GetLambdaInput } from '../../get-lambda/get-lambda.input'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql.gen'
import { UpdateLambdaInput } from '../update-lambda.input'
import {
  TestUpdateLambdaGql,
  TestUpdateLambdaMutation,
} from './update-lambda.api.graphql.gen'

describe('UpdateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updateLambdaInput: UpdateLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const results = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInput)

    updateLambdaInput = {
      id: results.createLambda.id,
      name: 'HelloWorld2',
      body: createLambdaInput.body,
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update a lambda', async () => {
      await domainRequest(guestApp, TestUpdateLambdaGql, updateLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update a lambda', async () => {
      await domainRequest<UpdateLambdaInput, TestUpdateLambdaMutation>(
        userApp,
        TestUpdateLambdaGql,
        updateLambdaInput,
      )

      const { getLambda } = await domainRequest<
        GetLambdaInput,
        TestGetLambdaQuery
      >(userApp, TestGetLambdaGql, { lambdaId: updateLambdaInput.id })

      expect(getLambda?.name).toBe(updateLambdaInput.name)
    })
  })
})
