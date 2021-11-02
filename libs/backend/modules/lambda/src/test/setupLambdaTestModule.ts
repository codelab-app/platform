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
import { GetLambdaInput } from '../use-cases/get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../use-cases/get-lambda/tests/get-lambda.api.graphql.gen'

export const setupLambdaTestModule = (resetDb = true) => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    createTestLambda: (input: CreateLambdaInput) => {
      return domainRequest<CreateLambdaInput, TestCreateLambdaMutation>(
        testModule.userApp,
        TestCreateLambdaGql,
        input,
      ).then((r) => r.createLambda)
    },
    getLambda: (input: GetLambdaInput) => {
      return domainRequest<GetLambdaInput, TestGetLambdaQuery>(
        testModule.userApp,
        TestGetLambdaGql,
        input,
      ).then((r) => r.getLambda)
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
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
