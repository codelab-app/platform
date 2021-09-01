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
import { GetLambdaInput } from '../../get-lambda/get-lambda.input'
import {
  GetLambdaGql,
  GetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql'
import { UpdateLambdaInput } from '../update-lambda.input'
import {
  UpdateLambdaGql,
  UpdateLambdaMutation,
} from './update-lambda.api.graphql'

describe('UpdateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let updateLambdaInput: UpdateLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const results = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

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
      await domainRequest(guestApp, UpdateLambdaGql, updateLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update a lambda', async () => {
      await domainRequest<UpdateLambdaInput, UpdateLambdaMutation>(
        userApp,
        UpdateLambdaGql,
        updateLambdaInput,
      )

      const { getLambda } = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        { lambdaId: updateLambdaInput.id },
      )

      expect(getLambda?.name).toBe(updateLambdaInput.name)
    })
  })
})
