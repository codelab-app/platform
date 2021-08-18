import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  DeleteLambdaGql,
  DeleteLambdaInput,
  DeleteLambdaMutation,
  GetLambdaGql,
  GetLambdaQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../../get-lambda'

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
