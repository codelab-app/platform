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
  DeleteLambdaGql,
  DeleteLambdaInput,
  DeleteLambdaMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/test/create-lambda.data'

describe('DeleteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let lambda: __LambdaFragment
  let deleteLambdaInput: DeleteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const results = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

    lambda = results.createLambda
    deleteLambdaInput = {
      lambdaId: lambda.id,
    }

    expect(lambda).toMatchObject(createLambdaInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete a lambda', async () => {
      await domainRequest(guestApp, DeleteLambdaGql, deleteLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete a lambda', async () => {
      const results = await domainRequest<
        DeleteLambdaInput,
        DeleteLambdaMutation
      >(userApp, DeleteLambdaGql, deleteLambdaInput)

      expect(results.deleteLambda).toMatchObject({ id: lambda.id })
    })
  })
})
