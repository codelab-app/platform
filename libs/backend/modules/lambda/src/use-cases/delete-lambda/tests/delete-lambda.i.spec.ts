import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { CreateLambdaInput } from '../../create-lambda'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql.gen'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../../get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql.gen'
import { DeleteLambdaInput } from '../delete-lambda.input'
import {
  TestDeleteLambdaGql,
  TestDeleteLambdaMutation,
} from './delete-lambda.api.graphql.gen'

describe('DeleteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deleteLambdaInput: DeleteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const { createLambda } = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInput)

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
      await domainRequest(guestApp, TestDeleteLambdaGql, deleteLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete a lambda', async () => {
      const getLambdaInput: GetLambdaInput = {
        lambdaId: deleteLambdaInput.lambdaId,
      }

      await domainRequest<DeleteLambdaInput, TestDeleteLambdaMutation>(
        userApp,
        TestDeleteLambdaGql,
        deleteLambdaInput,
      )

      const { getLambda } = await domainRequest<
        GetLambdaInput,
        TestGetLambdaQuery
      >(userApp, TestGetLambdaGql, getLambdaInput)

      expect(getLambda).toBeNull()
    })
  })
})
