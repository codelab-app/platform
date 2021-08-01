import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  UpdateLambdaGql,
  UpdateLambdaInput,
  UpdateLambdaMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/test/create-lambda.data'

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
      body: results.createLambda.body,
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
      const results = await domainRequest<
        UpdateLambdaInput,
        UpdateLambdaMutation
      >(userApp, UpdateLambdaGql, updateLambdaInput)

      expect(results.updateLambda?.name).toBe(updateLambdaInput.name)
    })
  })
})
