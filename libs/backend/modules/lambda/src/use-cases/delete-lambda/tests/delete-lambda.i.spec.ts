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
import { GetLambdaInput } from '../../get-lambda'
import {
  GetLambdaGql,
  GetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql'
import { DeleteLambdaInput } from '../delete-lambda.input'
import {
  DeleteLambdaGql,
  DeleteLambdaMutation,
} from './delete-lambda.api.graphql'

describe('DeleteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deleteLambdaInput: DeleteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const { createLambda } = await domainRequest<
      CreateLambdaInput,
      CreateLambdaMutation
    >(userApp, CreateLambdaGql, createLambdaInput)

    deleteLambdaInput = {
      lambdaId: createLambda.id,
    }

    expect(createLambda.id).toBeDefined()
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
      const getLambdaInput: GetLambdaInput = {
        lambdaId: deleteLambdaInput.lambdaId,
      }

      await domainRequest<DeleteLambdaInput, DeleteLambdaMutation>(
        userApp,
        DeleteLambdaGql,
        deleteLambdaInput,
      )

      const { getLambda } = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        getLambdaInput,
      )

      expect(getLambda).toBeNull()
    })
  })
})
