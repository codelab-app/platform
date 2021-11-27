import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../lambda.module'
import { CreateLambdaInput } from '../use-cases/create-lambda'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from '../use-cases/create-lambda/tests/create-lambda.api.graphql.gen'
import { DeleteLambdaInput } from '../use-cases/delete-lambda'
import {
  TestDeleteLambdaGql,
  TestDeleteLambdaMutation,
} from '../use-cases/delete-lambda/tests/delete-lambda.api.graphql.gen'
import { GetLambdaInput } from '../use-cases/get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../use-cases/get-lambda/tests/get-lambda.api.graphql.gen'

export const setupLambdaTestModule = (resetDb = true) => {
  const createdLambdas: Array<string> = []

  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    createTestLambda: async (input: CreateLambdaInput) => {
      const res = await domainRequest<
        CreateLambdaInput,
        TestCreateLambdaMutation
      >(testModule.userApp, TestCreateLambdaGql, input).then(
        (r) => r.createLambda,
      )

      createdLambdas.push(res.id)

      return res
    },
    getLambda: (input: GetLambdaInput) => {
      return domainRequest<GetLambdaInput, TestGetLambdaQuery>(
        testModule.userApp,
        TestGetLambdaGql,
        input,
      ).then((r) => r.getLambda)
    },
    deleteLambda: (input: DeleteLambdaInput) => {
      return domainRequest<DeleteLambdaInput, TestDeleteLambdaMutation>(
        testModule.userApp,
        TestDeleteLambdaGql,
        input,
      )
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([LambdaModule], {
      role: Role.Guest,
      resetDb,
    })
    testModule.userApp = await setupTestModule([LambdaModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    // Delete the created lambdas in AWS
    for (const lambdaId of createdLambdas) {
      await testModule.deleteLambda({ lambdaId })
    }

    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
